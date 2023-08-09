//tenemos al modelo en la constante producto
const Producto = require('../models/producto.model');

module.exports.createProducto = (request, response) =>{
    //desestructuramos
    const {nombre,marca,cantidad,precio} = request.body;
    Producto.create({
        nombre, marca,cantidad,precio
    })
        .then(producto => response.json({insertedProducto: producto, msg: 'Creación exitosa'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllProductos = (_,response) =>{
    Producto.find({}, null,{sort: {name: 1}})
    .then(retrievedProductos => response.json(retrievedProductos))
    .catch(err => response.json(err))
}

module.exports.getProducto = (request, response) =>{
    Producto.findOne({_id: request.params.id})
    .then(producto => response.json(producto))
    .catch(err => response.status(400).json(err));
}

module.exports.updateProducto = (request, response) =>{

    const bool = request.body.nombre !== '' && request.body.marca !== '' && request.body.cantidad !== '' && request.body.precio !== '';

    if(bool){
        Producto.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
            .then(updatedProducto =>{
                response.json({updatedProducto: updatedProducto, msg:'Producto ha sido actualizado', bool: true});
            })
            .catch(err => response.json({err: err, msg: 'Error al actualizar el producto'}));
    }else{
        response.json({ msg: 'Ningún campo debe estar vacío', bool: false })
    }
}

module.exports.deleteProducto = (request, response) =>{
    Producto.deleteOne({_id: request.params.id})
    .then(productoDeleted => response.json(productoDeleted))
    .catch(err => response.json(err))
}
