const Product = require("../models/Product")

require('dotenv').config({path: 'variables.env'});


exports.crearProducto = async (req, res) => {

    const nuevoProducto = new Product(req.body);

    try {
        const producto = await nuevoProducto.save();
        res.status(201).json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "No se pudo Registrar" })        
    }
}

exports.actualizarProducto = async (req, res) => {

    try {
        const productoActualizado = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(productoActualizado)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al actualizar datos' });
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'El producto ha sido eliminado' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al eliminar el producto' });
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.obtenerProductos = async (req, res) => {
    
    const qNew = req.query.new;
    const qCategoria = req.query.categoria;
    try {
        let productos;

        if(qNew) {
            productos = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if(qCategoria) {
            productos = await Product.find({
                categoria: {
                    $in: [qCategoria]
                }
            });
        } else {
            productos = await Product.find();
        }

        res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al eliminar usuario' });
    }
}
