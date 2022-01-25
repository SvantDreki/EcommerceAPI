const User = require("../models/User")
const CryptoJs = require('crypto-js')

require('dotenv').config({path: 'variables.env'});

exports.crearUsuario = async (req, res) => {

    const { password } = req.body

    const usuario = new User(req.body)
    usuario.password = CryptoJs.AES.encrypt(password, process.env.PASS_SECRET).toString();

    try {
        await usuario.save();
        res.status(201).json({ msg: "Usuario Registrado" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "No se pudo Registrar" })        
    }
}

exports.actualizarUsuario = async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString();
    }

    try {
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(usuarioActualizado)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al actualizar datos' });
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'El usuario ha sido eliminado' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al eliminar usuario' });
    }
}

exports.obtenerUsuario = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        const { password, ...otros } = usuario._doc;
        res.status(200).json(otros);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.obtenerUsuarios = async (req, res) => {
    //si en la query viene new mostrara los ultimo 5 usuarios ordenados del mas nuevo al viejo
    const query = req.query.new;
    try {
        const usuarios = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.obtenerStats = async (req, res) => {
    const date = new Date();
    const ultimoAño = new Date( date.setFullYear(date.getFullYear() - 1) );
    
    try {
        const data = await User.aggregate([
            //$match ve por una condicion
            //en este caso que createdAt sea mayor($gte) a el ultimo año
            { $match: { createdAt: { $gte: ultimoAño } } },
            {
                //se crea una variable
                $project: {
                    //se crea la variable month que obtiene con $month en el atributo createdAt
                    month: { $month: "$createdAt" }
                }
            },
            {
                //se crea un objeto
                $group: {
                    //el id del objeto es la variable $month creada arriba
                    _id: "$month",
                    //y el total es la suma de usuarios que tengan ese mes (se utiliza el metodo #sum) 
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}