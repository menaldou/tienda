//tenemos al modelo en la constante venta
const Venta = require('../models/venta.model');

module.exports.createVenta = (request, response) =>{
    //desestructuramos
    const {numArticulos, articulos, fecha, total} = request.body;
    Venta.create({
        numArticulos, articulos, fecha, total
    })
        .then(venta => response.json({insertedVenta: venta, msg: 'Creación exitosa'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllVentas = (_,response) =>{
    Venta.find({}, null,{sort: {name: 1}})
    .then(retrievedVentas => response.json(retrievedVentas))
    .catch(err => response.json(err))
}

module.exports.getVenta = (request, response) =>{
    Venta.findOne({_id: request.params.id})
    .then(venta => response.json(venta))
    .catch(err => response.status(400).json(err));
}

module.exports.updateVenta = (request, response) =>{
    Venta.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updatedVenta =>{
        response.json({updatedVenta: updatedVenta, msg:'Venta ha sido actualizado'});
    })
    .catch(err => response.json({err: err, msg: 'Error al actualizar la venta'}));
}

module.exports.deleteVenta = (request, response) =>{
    Venta.deleteOne({_id: request.params.id})
    .then(ventaDeleted => response.json(ventaDeleted))
    .catch(err => response.json(err))
}