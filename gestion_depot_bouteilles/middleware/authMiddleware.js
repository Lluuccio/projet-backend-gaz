const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/default');

const authMiddleware = async (req, res, next) => {
    console.log("🔎 En-têtes reçus :", req.headers);
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log("🟢 Token extrait :", token);

    if (!token) {
        console.log("❌ Aucun token reçu !");
        return res.status(403).json({ message: 'Accès interdit. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        console.log("🟢 Token décodé :", decoded);

        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("❌ Utilisateur introuvable.");
            return res.status(403).json({ message: 'Utilisateur introuvable.' });
        }

        req.user = user.toObject(); 
        next();
    } catch (err) {
        console.log("❌ Erreur lors de la vérification du token :", err);
        return res.status(403).json({ message: 'Token invalide.' });
    }
};

module.exports = authMiddleware;