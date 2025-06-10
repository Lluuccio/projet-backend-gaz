const mongoose = require('mongoose');

const livraisonSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    chauffeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Chauffeur', required: true },
    bouteillesLivrees: { type: Number, required: true },
    montantPaye: { type: Number, required: true },
});

module.exports = mongoose.model('Livraison', livraisonSchema);