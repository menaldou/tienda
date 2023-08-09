const mongoose = require('mongoose');

const ProductoScheme = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Es necesario insertar el nombre del producto'],
    },
    marca: {
        type: String,
        required: [true, 'Es necesario insertar la marca del producto'],
    },
    cantidad: {
        type: Number,
        required: [true, 'Es necesario insertar la cantidad del producto'],
    },
    precio: {
        type: String,
        required: [true, 'Es necesario insertar el precio del producto']
    }
});

const Producto = mongoose.model('Producto', ProductoScheme);

module.exports = Producto;