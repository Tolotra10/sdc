const DocumentModel = require('../models/document.model');

class DocumentController {
    // Créer un nouveau document
    static async create(req, res) {
        try {
    
            const document = await DocumentModel.create(req.body);
    
            res.status(201).json({
                success: true,
                data: document
            });


        } catch (error) {
            console.error('Erreur lors de la création du document:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la création du document",
                error: error.message
            });
        }
    }

    // Récupérer tous les documents
    static async getAll(req, res) {
        try {
            const documents = await DocumentModel.findAll();
            res.json({
                success: true,
                data: documents
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des documents:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération des documents",
                error: error.message
            });
        }
    }

    // Récupérer un document spécifique
    static async getOne(req, res) {
        try {
            const document = await DocumentModel.findById(req.params.id);
            if (!document) {
                return res.status(404).json({
                    success: false,
                    message: "Document non trouvé"
                });
            }
            res.json({
                success: true,
                data: document
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du document:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération du document",
                error: error.message
            });
        }
    }

    // Mettre à jour un document
    static async update(req, res) {
        try {
            const document = await DocumentModel.update(req.params.id, req.body);
            if (!document) {
                return res.status(404).json({
                    success: false,
                    message: "Document non trouvé"
                });
            }
            res.json({
                success: true,
                data: document
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du document:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la mise à jour du document",
                error: error.message
            });
        }
    }

    // Supprimer un document
    static async delete(req, res) {
        try {
            const document = await DocumentModel.delete(req.params.id);
            if (!document) {
                return res.status(404).json({
                    success: false,
                    message: "Document non trouvé"
                });
            }
            res.json({
                success: true,
                message: "Document supprimé avec succès",
                data: document
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du document:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression du document",
                error: error.message
            });
        }
    }
}

module.exports = DocumentController;