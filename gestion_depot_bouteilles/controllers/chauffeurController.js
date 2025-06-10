const Chauffeur = require('../models/Chauffeur');
const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.create = async (req, res) => {
    const { nom, prenom, email, telephone, salaireParBouteille } = req.body;

    try {
        
        if (await Chauffeur.findOne({ email })) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        const newChauffeur = new Chauffeur({
            nom,
            prenom,
            email,
            telephone,
            salaireParBouteille
        });

        await newChauffeur.save();
        res.status(201).json(newChauffeur);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer tous les chauffeurs avec infos utilisateur
exports.getAll = async (req, res) => {
    try {
        
        const chauffeurs = await Chauffeur.find(); // ✅
        res.status(200).json(chauffeurs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Erreur serveur',
            details: error.message 
        });
    }
};

// Mettre à jour un chauffeur
exports.update = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        
        const updatedChauffeur = await Chauffeur.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedChauffeur) {
            return res.status(404).json({ message: 'Chauffeur non trouvé' });
        }

        res.status(200).json({
            message: 'Chauffeur mis à jour',
            chauffeur: updatedChauffeur
        });
    } catch (error) {
        console.error('Erreur mise à jour chauffeur:', error);
        res.status(400).json({ 
            error: 'Erreur de validation',
            details: error.message 
        });
    }
};

// Supprimer un chauffeur
exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedChauffeur = await Chauffeur.findByIdAndDelete(id);
        
        if (!deletedChauffeur) {
            return res.status(404).json({ message: 'Chauffeur non trouvé' });
        }

        // Supprimez seulement le chauffeur (plus de suppression User)
        res.status(200).json({ message: 'Chauffeur supprimé avec succès' });

    } catch (error) {
        console.error('Erreur suppression chauffeur:', error);
        res.status(500).json({ 
            error: 'Erreur serveur',
            details: error.message 
        });
    }
};