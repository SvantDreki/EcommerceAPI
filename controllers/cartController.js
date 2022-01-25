const Cart = require("../models/Cart");

require('dotenv').config({path: 'variables.env'}); 

exports.crearCarro = async (req, res) => {

    const nuevoCarro = new Cart(req.body);

    try {
        const carro = await nuevoCarro.save();
        res.status(201).json(carro);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "No se pudo Registrar" })        
    }
}

exports.actualizarCarro = async (req, res) => {

    try {
        const carroActualizado = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(carroActualizado)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al actualizar datos' });
    }
}

exports.eliminarCarro = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'El Carro ha sido eliminado' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al eliminar el carro' });
    }
}

exports.obtenerUsuarioCarro = async (req, res) => {
    try {
        const carro = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(carro);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.obtenerCarritos = async (req, res) => {
    
    try {
        const carritos = await Cart.find();
        res.status(200).json(carritos)
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }

}