const mongoose = require('mongoose');

const camionSchema = new mongoose.Schema({
    immatriculation: { type: String, required: true },
    chauffeur: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Chauffeur',
      required: true 
    }
  }, { timestamps: true });

module.exports = mongoose.model('Camion', camionSchema);