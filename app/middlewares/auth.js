const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    const token = req.header('auth-token'); // For any authenticated request, need to pass auth-token header

    if(!token) return res.status(401)

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
    } catch (error) {
        res.status(401)
    }

    next();
}

const AuthWebMiddleware = (req, res, next) => {
    const token = req.header('auth-token'); // For any authenticated request, need to pass auth-token header

    if(!token) return res.status(401).redirect('/login')

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
    } catch (error) {
        res.status(401).redirect('/401')
    }

    next();
}

module.exports = {
    AuthMiddleware,
    AuthWebMiddleware
};