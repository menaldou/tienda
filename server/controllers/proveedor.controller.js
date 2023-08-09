//tenemos al modelo en la constante proveedor
const Proveedor = require('../models/proveedor.model');

module.exports.createProveedor = (request, response) =>{
    //desestructuramos
    const {empresa,descripcion} = request.body;
    Proveedor.create({
        empresa, descripcion
    })
        .then(proveedor => response.json({insertedProveedor: proveedor, msg: 'Creación exitosa'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllProveedores = (_,response) =>{
    Proveedor.find({}, null,{sort: {name: 1}})
    .then(retrievedProveedores => response.json(retrievedProveedores))
    .catch(err => response.json(err))
}

module.exports.getProveedor = (request, response) =>{
    Proveedor.findOne({_id: request.params.id})
    .then(proveedor => response.json(proveedor))
    .catch(err => response.status(400).json(err));
}

module.exports.updateProveedor = (request, response) =>{

    const bool = request.body.empresa !== '' && request.body.descripcion;

    if(bool){
        Proveedor.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
        .then(updatedProveedor =>{
            response.json({updatedProveedor: updatedProveedor, msg:'Proveedor ha sido actualizado', bool: true});
        })
        .catch(err => response.json({err: err, msg: 'Error al actualizar el proveedor'}));
    }else{
        response.json({ msg: 'Ningún campo debe estar vacío', bool: false })
    }
}

module.exports.deleteProveedor = (request, response) =>{
    Proveedor.deleteOne({_id: request.params.id})
    .then(proveedorDeleted => response.json(proveedorDeleted))
    .catch(err => response.json(err))
}