const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify( token, process.env.JWT_KEY, (err, usuario) => {
            if(err) res.status(403).json("Token no válido");
            req.usuario = usuario;
            next();
        } )
    } else {
        return res.status(401).json("No autenticado");
    }
}

const verificarTokenAutorizaicion = (req, res, next) => {
    verificarToken(req, res, () => {
        if(req.usuario.id === req.params.id || req.usuario.isAdmin) {
            next();
        } else {
            res.status(403).json("No tienes permiso para hacer eso")
        }
    })
}

const verificarTokenAdmin = (req, res, next) => {
    verificarToken(req, res, () => {
        if(req.usuario.isAdmin) {
            next();
        } else {
            res.status(403).json("No tienes permiso para hacer eso")
        }
    })
}

module.exports = { verificarToken, verificarTokenAutorizaicion,verificarTokenAdmin }