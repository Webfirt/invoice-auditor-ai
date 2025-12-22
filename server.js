// Fichier : server.js (Architecture Microservice - Invoice Integrity AI)

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const invoiceRoutes = require('./routes/invoiceRoutes');

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || "http://localhost:8000";
// Utilise cette variable pour tes appels fetch/axios vers l'IA

// 1. Charger les variables d'environnement D'ABORD
dotenv.config();

// 2. Initialiser l'application AVANT de l'utiliser
const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---

// 3. Servir les fichiers statiques (Maintenant que 'app' existe)
app.use(express.static('public'));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Permet de lire le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// --- ROUTES ---

// Montage du Routeur Invoice
app.use('/api/invoices', invoiceRoutes); 

// Route d'accueil
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Backend Node.js opérationnel",
        integrations: {
            python_service: "http://localhost:8000",
            status: "Connected (Proxy mode)"
        },
        user: "Godfroy Senakpon"
    });
});

// --- GESTION DES ERREURS GLOBALE ---
app.use((err, req, res, next) => {
    console.error("❌ Erreur Serveur Node:", err.stack);
    res.status(500).json({ error: "Une erreur interne est survenue sur le serveur Node.js" });
});

// --- DÉMARRAGE DU SERVEUR ---
app.listen(PORT, () => {
    console.log(`======================================================`);
    console.log(`🚀 SERVEUR NODE.JS DÉMARRÉ SUR LE PORT ${PORT}`);
    console.log(`🔗 API BASE : http://localhost:${PORT}/api/invoices`);
    console.log(`------------------------------------------------------`);
    console.log(`💡 STATUS MICROSERVICES :`);
    console.log(`   - Node.js (Orchestrateur) : OK ✅`);
    console.log(`   - Python (Audit/ERNIE/Mistral) : Attendu sur port 8000 🐍`);
    console.log(`======================================================`);
});