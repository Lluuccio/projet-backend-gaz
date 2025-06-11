module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb+srv://maza:m8GeXFtTiBTHIxEA@cluster0.s1m5f.mongodb.net/gestion_depot_bouteilles',
    jwtSecret: process.env.JWT_SECRET || 'monSuperSecretTresSecret123',
    port: process.env.PORT || 5000
};