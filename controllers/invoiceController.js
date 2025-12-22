const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { Parser } = require('json2csv');

const PYTHON_SERVICE_URL = "http://127.0.0.1:8000/process_invoice/";

exports.processInvoiceAndAudit = async (req, res) => {
    try {
        // 1. Vérifier si le fichier a été bien reçu par Multer
        if (!req.file) {
            return res.status(400).json({ error: "Aucun fichier téléchargé." });
        }

        console.log(`--- Traitement de la facture : ${req.file.originalname} ---`);

        // 2. Préparer le formulaire pour le service Python
        const form = new FormData();
        // On crée un flux de lecture à partir du fichier temporaire
        form.append('file', fs.createReadStream(req.file.path), {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        // 3. Envoyer le fichier au microservice Python
        // FIX: Augmentation du timeout à 5 minutes (300000ms)
        const response = await axios.post(PYTHON_SERVICE_URL, form, {
            headers: {
                ...form.getHeaders(),
            },
            timeout: 300000 
        });

        // 4. Supprimer le fichier temporaire du serveur Node
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // 5. Renvoyer la réponse enrichie au client (Frontend)
        res.status(200).json({
            message: "Audit terminé avec succès",
            source: "ERNIE AI / TinyLlama", // Mis à jour pour refléter l'utilisation de TinyLlama
            data: response.data
        });

    } catch (error) {
        console.error("❌ Erreur de communication avec le service AI:", error.message);
        
        // Nettoyage : supprimer le fichier même en cas d'erreur
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        const status = error.code === 'ECONNABORTED' ? 504 : 503;
        const msg = error.code === 'ECONNABORTED' 
            ? "Le traitement a pris trop de temps (Timeout). TinyLlama est peut-être lent." 
            : "Le service d'audit (Python) est indisponible.";

        res.status(status).json({ 
            error: msg,
            details: error.message 
        });
    }
};

exports.exportToCSV = (req, res) => {
    try {
        const data = req.body.data;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ error: "Données invalides pour l'exportation." });
        }

        const fields = [
            'timestamp', 
            'filename', 
            'structured_data.supplier', 
            'structured_data.subtotal_ht', 
            'structured_data.tax_amount_tva', 
            'structured_data.total_amount_ttc_extracted',
            'structured_data.is_audited_ok'
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);

        res.header('Content-Type', 'text/csv');
        res.attachment(`audit_export_${Date.now()}.csv`);
        return res.send(csv);

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la génération du CSV." });
    }
};