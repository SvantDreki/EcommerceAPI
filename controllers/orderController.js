const Order = require("../models/Order");

require('dotenv').config({path: 'variables.env'}); 

exports.crearOrder = async (req, res) => {

    const nuevoOrder = new Order(req.body);

    try {
        const order = await nuevoOrder.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "No se pudo Registrar" })        
    }
}

exports.actualizarOrder = async (req, res) => {

    try {
        const orderActualizado = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(orderActualizado)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al actualizar datos' });
    }
}

exports.eliminarOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Orden eliminada' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al eliminar la orden' });
    }
}

exports.obtenerUsuarioOrdenes = async (req, res) => {
    try {
        const ordenes = await Order.find({ userId: req.params.userId });
        res.status(200).json(ordenes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.obtenerOrdenes = async (req, res) => {
    
    try {
        const ordenes = await Order.find();
        res.status(200).json(ordenes)
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }

}

exports.obtenerStats = async (req, res) => {
    const date = new Date();
    const ultimoMes = new Date(date.setMonth(date.getMonth() - 1));
    const mesPrevio = new Date(date.setMonth(ultimoMes.getMonth() - 1));

    console.log(ultimoMes, 'ultimo');
    console.log(mesPrevio, 'Previo');

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: mesPrevio } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$monto'
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' }
                }
            }
        ]);

        res.status(200).json(income);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' })
    }

}