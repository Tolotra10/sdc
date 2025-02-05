const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document.controller');

// Routes protégées par l'authentification
router.post('/', DocumentController.create);
router.get('/documents', DocumentController.getAll);
router.get('/documents/:id', DocumentController.getOne);
router.put('/documents/:id', DocumentController.update);
router.delete('/documents/:id', DocumentController.delete);

module.exports = router;