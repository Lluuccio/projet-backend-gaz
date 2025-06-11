const Bouteille = require('../models/Bouteille');

exports.create = async (req, res) => {
    const { type, statut } = req.body;
    const newBouteille = new Bouteille({ type, statut });

    try {
        await newBouteille.save();
        res.status(201).json({ message: 'Bouteille créée avec succès', bouteille: newBouteille });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de la bouteille' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const bouteilles = await Bouteille.find();
        res.status(200).json(bouteilles);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des bouteilles' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { type, statut } = req.body;

    try {
        const updatedBouteille = await Bouteille.findByIdAndUpdate(id, { type, statut }, { new: true });
        if (!updatedBouteille) return res.status(404).json({ message: 'Bouteille non trouvée' });
        res.status(200).json({ message: 'Bouteille mise à jour avec succès', bouteille: updatedBouteille });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour de la bouteille' });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBouteille = await Bouteille.findByIdAndDelete(id);
        if (!deletedBouteille) return res.status(404).json({ message: 'Bouteille non trouvée' });
        res.status(200).json({ message: 'Bouteille supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la bouteille' });
    }
};