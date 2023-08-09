const mongoose = require('mongoose');

const ProveedorScheme = new mongoose.Schema({
    empresa: {
        type: String,
        required: [true, 'Es necesario insertar el nombre de la empresa'],
    },
    descripcion: {
        type: String,
        required: [true, 'Es necesario insertar la descripcion de la empresa'],
    }
});

const Proveedor = mongoose.model('Proveedor', ProveedorScheme);

module.exports = Proveedor;