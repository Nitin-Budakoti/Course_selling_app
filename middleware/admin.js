const jwt = require('jsonwebtoken');
const { JWT_SECRET_ADMIN } = require("../config");

function adminmiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_ADMIN);
        req.adminId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = adminmiddleware;