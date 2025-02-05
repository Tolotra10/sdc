const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuration CORS plus détaillée
const corsOptions = {
    origin: ['http://localhost:3000', process.env.CLIENT_URL], // Autorise localhost:3000 et l'URL client
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware pour logger les requêtes (utile pour le debug)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API est fonctionnelle' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/', require('./routes/document.routes'))

// Gestion des routes non trouvées
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs améliorée
app.use((err, req, res, next) => {
    console.error('Erreur :', err);

    // Gestion des différents types d'erreurs
    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            message: 'Erreur de validation', 
            details: err.message 
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ 
            message: 'Non autorisé' 
        });
    }

    // Erreur par défaut
    res.status(err.status || 500).json({ 
        message: err.message || 'Erreur serveur interne',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

const PORT = process.env.PORT ;

// Démarrage du serveur avec gestion d'erreur
app.listen(PORT, (err) => {
    if (err) {
        console.error('Erreur au démarrage du serveur :', err);
        process.exit(1);
    }
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    console.log(`API accessible à http://localhost:${PORT}/api`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
    console.error('Erreur non gérée :', err);
    process.exit(1);
});

