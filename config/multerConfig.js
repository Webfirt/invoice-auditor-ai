// Fichier : config/multerConfig.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Définir le répertoire de stockage temporaire
const UPLOAD_DIR = path.join(__dirname, '..', 'src');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

// 2. Stratégie de stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 3. Configuration finale
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        // AJOUT : .webp car c'est le format que tu as testé précédemment
        // NOTE : J'ai retiré PDF pour l'instant car le service Python attend une image PIL
        const filetypes = /jpeg|jpg|png|webp/; 
        
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Seuls les formats images (.jpg, .png, .webp) sont acceptés pour l'audit instantané."));
    }
});

module.exports = upload;