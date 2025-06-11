const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./config/default');
const routes = require('./routes/routes');
const User = require('./models/User'); 

const app = express();
app.use(express.json());
app.use('/', routes);

async function createAdmin() {
    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("admin123", 10); 
        const adminUser = new User({
            nom: "Admin",
            prenom: "Super",
            email: adminEmail,
            motDePasse: hashedPassword,
            role: "admin",
        });

        await adminUser.save();
        console.log("✅ Administrateur créé avec succès !");
    } else {
        console.log("⚠️ Administrateur déjà existant.");
    }
}

mongoose.connect(config.mongoURI)
    .then(async () => {
        console.log('✅ Base de données connectée avec succès');

        // Création de l'admin après la connexion à la base de données
        await createAdmin();

        app.listen(config.port, () => {
            console.log(`✅ Serveur démarré sur le port ${config.port}`);
        });
    })
    .catch(err => {
        console.error('❌ Erreur de connexion à MongoDB:', err);
    });
