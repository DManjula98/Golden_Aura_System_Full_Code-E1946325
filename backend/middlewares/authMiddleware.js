const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(409).json({ error: "Please login first" });
    } else {
        try {
            const deCodeToken = await jwt.verify(accessToken, process.env.SECRET);
            console.log('Decoded Token:', deCodeToken);
            req.role = deCodeToken.role;
            req.id = deCodeToken.id;

            if (!req.id) {
                return res.status(400).json({ error: "User ID is missing in token" });
            }
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error.message);
            return res.status(409).json({ error: "Invalid token" });
        }
    }
};
