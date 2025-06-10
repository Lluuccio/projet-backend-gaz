const Camion = require('../models/Camion');

exports.create = async (req, res) => {
    const { immatriculation, chauffeur } = req.body;
    const newCamion = new Camion({ immatriculation, chauffeur });

    try {
        await newCamion.save();
        res.status(201).json({ message: 'Camion créé avec succès', camion: newCamion });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du camion' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const camions = await Camion.find().populate('chauffeur');
        res.status(200).json(camions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des camions' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { chauffeur } = req.body;

    // 1. Validation des IDs
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(chauffeur)) {
        return res.status(400).json({ error: "ID(s) invalide(s)" });
    }

    try {
        // 2. Vérification synchrone en parallèle
        const [camion, chauffeurExist] = await Promise.all([
            Camion.findById(id),
            Chauffeur.findById(chauffeur)
        ]);

        if (!camion || !chauffeurExist) {
            return res.status(404).json({ 
                error: "Ressource introuvable",
                details: `Camion: ${!!camion}, Chauffeur: ${!!chauffeurExist}`
            });
        }

        // 3. Mise à jour
        camion.chauffeur = chauffeur;
        await camion.save();

        res.status(200).json({
            message: "Mis à jour avec succès",
            immatriculation: camion.immatriculation,
            chauffeur: chauffeurExist.nom
        });

    } catch (error) {
        console.error("Erreur PATCH /camions:", error);
        res.status(500).json({ 
            error: "Erreur serveur", 
            details: error.message 
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCamion = await Camion.findByIdAndDelete(id);
        if (!deletedCamion) return res.status(404).json({ message: 'Camion non trouvé' });
        res.status(200).json({ message: 'Camion supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du camion' });
    }
};