
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }
    
     // Vérifier le format de l'email 
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Créer le nouvel utilisateur
    const newUser = await User.create(username, email, password, role);

    // Générer le token JWT
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

const getMe = async (req, res) => {
  try {
    // Vérification que req.user.id existe
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'ID utilisateur manquant' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur dans getMe:', error); // Pour le debugging
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const logout = async (req, res) => {
  try {
    // Dans une implémentation simple, côté client, il suffit de supprimer le token
    res.status(200).json({ message: 'Déconnexion réussie' });
    
  } catch (error) {
    console.error('Erreur logout:', error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
};

const getAll = async (req, res) => {
  try {
      const users = await User.findAll();
      res.json({
          success: true,
          data: users
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des users:', error);
      res.status(500).json({
          success: false,
          message: "Erreur lors de la récupération des users",
          error: error.message
      });
  }
}

const updateUser = async (req, res) => {
  try {
      const user = await User.update(req.params.id, req.body);
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User non trouvé"
          });
      }
      res.json({
          success: true,
          data: user
      });
  } catch (error) {
      console.error('Erreur lors de la mise à jour de user:', error);
      res.status(500).json({
          success: false,
          message: "Erreur lors de la mise à jour de user",
          error: error.message
      });
  }
}

module.exports = {
  register,
  login,
  logout,
  getMe,
  getAll,
  updateUser
};