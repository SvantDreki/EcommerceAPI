const User = require("../models/User");
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'});

exports.autenticarUsuario = async (req, res, next) => {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if(!usuario) {
        res.status(401).json({ msg: "El usuario no esta registrado" });
        return next();
    }

    const hash = CryptoJs.AES.decrypt(usuario.password, process.env.PASS_SECRET);
    const compare = hash.toString(CryptoJs.enc.Utf8);

    if(compare === password) {
        
        //forma de quitar el password del usuario
        const { password: pass, ...otros } = usuario._doc;

        //Crear el JsonWebToken
        const token = jwt.sign({
            id: usuario._id,
            isAdmin: usuario.isAdmin
        }, process.env.JWT_KEY, { expiresIn: '3d' })

        res.status(200).json({...otros, token});

    } else {
        res.status(401).json({ msg: 'Password Incorrecta' });
        return next();
    }
}