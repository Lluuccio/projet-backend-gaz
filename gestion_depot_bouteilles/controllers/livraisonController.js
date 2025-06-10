const mongoose = require('mongoose');
const Livraison = require('../models/livraison');
const Chauffeur = require('../models/Chauffeur');

exports.create = async (req, res) => {
    const { date, chauffeur, bouteillesLivrees, montantPaye } = req.body;

    try {
        // 1. Validation du chauffeur
        const chauffeurExists = await Chauffeur.findById(chauffeur);
        if (!chauffeurExists) {
            return res.status(400).json({ 
                error: "Chauffeur invalide",
                details: `L'ID ${chauffeur} ne correspond à aucun chauffeur`
            });
        }

        // 2. Validation des montants
        if (bouteillesLivrees <= 0 || montantPaye <= 0) {
            return res.status(400).json({
                error: "Valeurs invalides",
                details: "Les quantités doivent être positives"
            });
        }

        // 3. Création
        const newLivraison = new Livraison({
            date: date || Date.now(), // Date actuelle si non fournie
            chauffeur,
            bouteillesLivrees,
            montantPaye
        });

        await newLivraison.save();

        // 4. Réponse avec données complètes
        const result = await Livraison.findById(newLivraison._id)
            .populate('chauffeur', 'nom prenom email');

        res.status(201).json({
            message: "Livraison enregistrée",
            livraison: result
        });

    } catch (error) {
        console.error("Erreur création livraison:", error);
        res.status(500).json({
            error: "Erreur serveur",
            details: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const livraisons = await Livraison.find().populate('chauffeur');
        res.status(200).json(livraisons);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des livraisons' });
    }
};

// Nouvelle méthode pour récupérer les livraisons d'un chauffeur spécifique
exports.getLivraisonsByChauffeur = async (req, res) => {
    const chauffeurId = req.user.id; // Récupérer l'ID du chauffeur à partir du token

    try {
        const livraisons = await Livraison.find({ chauffeur: chauffeurId }).populate('chauffeur');
        res.status(200).json(livraisons);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des livraisons' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { date, chauffeur, bouteillesLivrees, montantPaye } = req.body;

    try {
        const updatedLivraison = await Livraison.findByIdAndUpdate(id, { date, chauffeur, bouteillesLivrees, montantPaye }, { new: true });
        if (!updatedLivraison) return res.status(404).json({ message: 'Livraison non trouvée' });
        res.status(200).json({ message: 'Livraison mise à jour avec succès', livraison: updatedLivraison });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour de la livraison' });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLivraison = await Livraison.findByIdAndDelete(id);
        if (!deletedLivraison) return res.status(404).json({ message: 'Livraison non trouvée' });
        res.status(200).json({ message: 'Livraison supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la livraison' });
    }
};