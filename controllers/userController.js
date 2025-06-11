const User = require('../models/User');
const bcrypt = require('bcrypt');

// Récupérer tous les utilisateurs (admin seulement)
exports.getAlluser = async (req, res) => {
    try {
        // Seul l'admin peut voir tous les utilisateurs
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Accès refusé." });
        }

        const users = await User.find({}, { motDePasse: 0 }); // Exclut les mots de passe
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Créer un utilisateur (admin seulement)
exports.createUser = async (req, res) => {
    const { nom, prenom, email, motDePasse, role } = req.body;

    try {
        // Vérification des droits
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Action non autorisée." });
        }

        // Validation du rôle
        if (!['admin', 'controleur'].includes(role)) {
            return res.status(400).json({ error: "Rôle invalide." });
        }

        // Vérification email unique
        if (await User.findOne({ email })) {
            return res.status(400).json({ error: "Email déjà utilisé." });
        }

        // Création de l'utilisateur
        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        const newUser = new User({
            nom,
            prenom,
            email,
            motDePasse: hashedPassword,
            role
        });

        await newUser.save();
        
        // Retourne les données sans le mot de passe
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.motDePasse;

        res.status(201).json({
            message: "Utilisateur créé",
            user: userWithoutPassword
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur de création" });
    }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Vérification des droits
        const isAdmin = req.user.role === 'admin';
        const isSelfUpdate = req.user._id === id;

        if (!isAdmin && !isSelfUpdate) {
            return res.status(403).json({ error: "Action non autorisée." });
        }

        // Un controleur ne peut pas se donner des droits admin
        if (updates.role && !isAdmin) {
            return res.status(403).json({ error: "Changement de rôle interdit." });
        }

        // Hachage du mot de passe si fourni
        if (updates.motDePasse) {
            updates.motDePasse = await bcrypt.hash(updates.motDePasse, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { 
            new: true,
            select: '-motDePasse' // Exclut le mot de passe de la réponse
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        res.status(200).json({
            message: "Utilisateur mis à jour",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur de mise à jour" });
    }
};

// Supprimer un utilisateur (admin seulement)
exports.deleteUser = async (req, res) => {
    try {
        // Seul l'admin peut supprimer
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Action non autorisée." });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur supprimé" });

    } catch (error) {
        res.status(500).json({ error: "Erreur de suppression" });
    }
};