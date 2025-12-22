🔎 Où Chercher l'API Key (Client ID)
Pour votre projet Invoice Auditor AI, vous devez trouver la documentation ou la page de la console Baidu relative à :

L'Authentification Générique Baidu AI : Elle explique comment obtenir le Client ID (API Key) et le Client Secret (Secret Key) pour tous les services AI.

L'API de Reconnaissance de Texte (OCR) : Pour utiliser PaddleOCR-VL.

L'API du Modèle de Langage (LLM/ERNIE Bot) : Pour la structuration des données.

Les clés d'application se trouvent habituellement dans la section de la console Baidu qui gère vos identités d'application.

Synthèse de l'Objectif de Recherche
Ce que vous avez trouvé	Ce que vous devez trouver
Endpoint / Authentication (ex: apm-collector.bj.baidubce.com)	API Key / Client ID (ex: ALTAK-mTNsaNCr4********)
Rôle : Sert à surveiller la performance de votre application.	Rôle : Sert à authentifier votre application pour utiliser les services (comme l'OCR et le LLM).

Exporter vers Sheets

Suggestion : Recherchez dans la console Baidu le terme "Access Key Management", "API Key Management" ou "Key Management". C'est là que les plateformes cloud stockent généralement les clés d'accès fondamentales utilisées pour l'authentification des requêtes API.

Une fois que vous aurez vos deux clés, nous pourrons finaliser le fichier .env et passer à l'étape du téléchargement de la facture avec Multer.
 
 // ceci est un commentaire :
 C'est un excellent point et une limitation cruciale si vous n'avez pas de carte bancaire pour vous inscrire à AWS, même si l'usage est dans le cadre du niveau Gratuit (Free Tier). De plus, il est vrai que l'accès aux clés IAM nécessite une inscription complète.

Si l'inscription à AWS est bloquée, et que Baidu était également trop contraignant, nous devons nous concentrer sur des fournisseurs qui offrent une inscription sans carte de crédit et qui peuvent gérer à la fois l'OCR et la structuration.

La meilleure alternative dans votre situation est Google Cloud Platform (GCP) ou des solutions d'API gratuites qui n'exigent pas de paiement immédiat.

💡 Nouvelle Stratégie : Utiliser Google Cloud Platform (GCP)
Google Cloud Platform offre un crédit gratuit initial significatif (souvent 300 USD) pendant une période d'essai (souvent 90 jours) qui est plus facile à obtenir et à utiliser que le Free Tier permanent d'AWS.

Cependant, même GCP exige généralement une carte de crédit pour vérifier votre identité lors de l'inscription initiale (même pour le crédit gratuit).

🎯 Solution de Contournement Recommandée
Si vous n'avez absolument aucune possibilité d'utiliser une carte bancaire (même une carte prépayée ou celle d'un ami/tuteur avec autorisation) pour l'étape de vérification :

Utilisez des services d'OCR gratuits basés sur le web.

Utilisez des LLM avec des limites gratuites et sans carte bancaire.

1. Pour l'OCR : Tesseract (Moteur local et gratuit)
Au lieu d'utiliser une API cloud payante, vous pouvez commencer par intégrer un moteur d'OCR directement dans votre application, qui fonctionne sans clé API ni frais :

Moteur	Avantages	Limitations
Tesseract OCR (maintenu par Google)	Totalement gratuit, fonctionne hors ligne (localement), ne nécessite aucune clé API ni carte.	Moins précis pour les factures complexes que Textract ou Cloud Vision AI.

Exporter vers Sheets

Action : Vous installeriez le paquet tesseract sur votre système et utiliseriez un wrapper comme tesseract.js (pour Node.js/JavaScript) pour extraire le texte des factures.

2. Pour le LLM (Structuration) : Services à Limite Gratuite
Si vous ne pouvez pas accéder à OpenAI (qui exige un mode de paiement), vos options deviennent très limitées.

Moteur	Statut de la Carte Bancaire
Hugging Face Inference API	Permet souvent l'utilisation de modèles sans carte pour les très petites requêtes, mais la limite est stricte.
Modèles auto-hébergés	Déployer votre propre LLM (ex : Llama 3) localement via Ollama. Aucun frais, mais exige de bonnes ressources matérielles.

Exporter vers Sheets

🛠️ Ma recommandation pour démarrer : Tesseract + Ollama/LLM Gratuit
Pour avancer sur votre projet sans frais ni carte bancaire, concentrez-vous sur l'intégration locale :

OCR : Installez et intégrez Tesseract OCR pour extraire le texte brut de la facture.

Structuration : Si votre ordinateur est suffisamment puissant, utilisez un outil comme Ollama pour exécuter un petit LLM localement et lui demander de structurer le texte brut extrait par Tesseract.

Cela vous permettra de finaliser la logique complète de votre application (téléchargement, OCR, LLM, structuration) avant de devoir passer à une solution cloud payante pour la production.

Voulez-vous que l'on commence par vous donner les étapes pour installer Tesseract OCR et l'intégrer dans votre projet, pour remplacer l'étape d'API ?