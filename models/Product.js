const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categoria: {
        type: Array
    },
    tamano: {
        type: String
    },
    color: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);