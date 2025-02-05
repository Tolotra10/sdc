const { validateRegistration, validateLogin } = require('../middleware/validate');
const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, getAll, updateUser } = require('../controllers/auth.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Route d'inscription
router.post('/register',validateRegistration, register);
router.post('/login',validateLogin, login);
router.post('/logout', logout);
router.get('/me',verifyToken, getMe);
router.get('/all', getAll);
router.put('/all/:id', updateUser);

// Route protégée exemple
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Route protégée accessible' });
});

// Route admin exemple
router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Route admin accessible' });
});

module.exports = router;