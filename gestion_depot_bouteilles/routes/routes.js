const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const bouteilleController = require('../controllers/bouteilleController');
const camionController = require('../controllers/camionController');
const chauffeurController = require('../controllers/chauffeurController');
const livraisonController = require('../controllers/livraisonController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Routes d'authentification
router.post('/login', authController.login);

// Routes pour les utilisateurs (seulement l'admin peut gérer les utilisateurs)
router.get('/users', authMiddleware, adminMiddleware, userController.getAlluser);
router.post('/users', authMiddleware, adminMiddleware, userController.createUser);
router.put('/users/:id', authMiddleware, adminMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, userController.deleteUser);

// Routes pour les bouteilles
router.get('/bouteilles', authMiddleware, bouteilleController.getAll);
router.post('/bouteilles', authMiddleware, adminMiddleware, bouteilleController.create);
router.put('/bouteilles/:id', authMiddleware, adminMiddleware, bouteilleController.update);
router.delete('/bouteilles/:id', authMiddleware, adminMiddleware, bouteilleController.delete);

// Routes pour les camions
router.get('/camions', authMiddleware, camionController.getAll);
router.post('/camions', authMiddleware, adminMiddleware, camionController.create);
router.put('/camions/:id', authMiddleware, adminMiddleware, camionController.update);
router.delete('/camions/:id', authMiddleware, adminMiddleware, camionController.delete);

// Routes pour les chauffeurs
router.get('/chauffeurs', authMiddleware, chauffeurController.getAll);
router.post('/chauffeurs', authMiddleware, adminMiddleware, chauffeurController.create);
router.put('/chauffeurs/:id', authMiddleware, adminMiddleware, chauffeurController.update);
router.delete('/chauffeurs/:id', authMiddleware, adminMiddleware, chauffeurController.delete);

// Routes pour les livraisons
router.get('/livraisons', authMiddleware, livraisonController.getAll);
router.post('/livraisons', authMiddleware, adminMiddleware, livraisonController.create);
router.put('/livraisons/:id', authMiddleware, adminMiddleware, livraisonController.update);
router.delete('/livraisons/:id', authMiddleware, adminMiddleware, livraisonController.delete);

// Route pour que le chauffeur voie ses livraisons
router.get('/livraisons/chauffeur', authMiddleware, livraisonController.getLivraisonsByChauffeur);

module.exports = router;