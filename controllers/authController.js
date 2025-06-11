const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('../config/default');

exports.login = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }

        const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error });
    }
};


