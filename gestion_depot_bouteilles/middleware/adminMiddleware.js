const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé. Seul l'administrateur peut effectuer cette action." });
    }
    next();
};

module.exports = adminMiddleware;
