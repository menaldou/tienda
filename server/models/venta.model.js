const mongoose = require('mongoose');

const VentaScheme = new mongoose.Schema({
    
    numArticulos: {
        type: String,
        required: [true, 'Es necesario poner el numero de articulos']
    },

    articulos: [{

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
            required: [true, 'Es necesario insertar la cantidad del producto vendido'],
        },
        precio: {
            type: String,
            required: [true, 'Es necesario insertar el precio del producto vendido'],
        },
        subtotal: {
            type: String,
            required: [true, 'Es necesario insertar un subtotal del producto vendido'],
        }
    }],
    fecha: {
        type: String,
        required: [true, 'Es necesario elegir la fecha de venta'],
    },
    
    total: {
        type: String,
        required: [true, 'Es necesario ingresar el total de la venta'],
    }
});

const Venta = mongoose.model('Venta', VentaScheme);

module.exports = Venta;