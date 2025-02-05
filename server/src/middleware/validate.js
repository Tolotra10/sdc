const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;
  
    // Validation existante
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    next();
  };
  
  const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }
  
    next();
  };
  
  module.exports = { validateRegistration, validateLogin };