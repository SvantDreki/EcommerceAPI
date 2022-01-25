const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String
            },
            cantidad: {
                type: Number,
                default: 1
            }
        }
    ],
    monto: {
        type: Number,
        required: true
    },
    direccion: {
        type: Object,
        required: true
    },
    estatus: {
        type: String, 
        default: "Pendiente"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);