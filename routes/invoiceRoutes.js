// Fichier : routes/invoiceRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); 
const invoiceController = require('../controllers/invoiceController');

/**
 * 1. Route pour l'Upload et le Traitement (POST)
 * Ajout d'un timeout étendu pour laisser le temps à TinyLlama de répondre.
 */
router.post('/upload-and-audit', (req, res, next) => {
    // FIX: On augmente le délai d'attente à 5 minutes (300 000 ms)
    // Cela évite que Node ne coupe la connexion avant que Python ait fini.
    req.setTimeout(300000); 

    // On enveloppe upload.single pour capturer les erreurs Multer
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ 
                error: "Erreur lors du téléchargement du fichier.", 
                details: err.message 
            });
        }
        next();
    });
}, invoiceController.processInvoiceAndAudit);

/**
 * 2. Route pour l'Exportation CSV (POST)
 */
router.post('/export/csv', invoiceController.exportToCSV); 

module.exports = router;