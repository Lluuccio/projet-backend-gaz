const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    motDePasse: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'controleur'], 
        required: true 
    }
});

module.exports = mongoose.model('User', userSchema);
