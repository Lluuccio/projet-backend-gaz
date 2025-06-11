const mongoose = require('mongoose');

const chauffeurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    telephone: { type: String },
    salaireParBouteille: { type: Number, default: 0 },
    dateEmbauche: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Chauffeur', chauffeurSchema);