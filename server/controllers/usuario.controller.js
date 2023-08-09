//tenemos al modelo en la constante usuario
const Usuario = require('../models/usuario.model');

module.exports.createUsuario = (request, response) =>{
    //desestructuramos
    const {nombre,apellido,img,cedula,username,passwd,admin,confirmPassword} = request.body;
    Usuario.create({
        nombre,apellido,img,cedula,username,passwd,admin,confirmPassword
    })
        .then(usuario => response.json({insertedUsuario: usuario, msg: 'Creación exitosa'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllUsuarios = (_,response) =>{
    Usuario.find({}, null,{sort: {name: 1}})
    .then(retrievedUsuarios => response.json(retrievedUsuarios))
    .catch(err => response.json(err))
}

module.exports.getUsuario = (request, response) =>{
    Usuario.findOne({_id: request.params.id})
    .then(usuario => response.json(usuario))
    .catch(err => response.status(400).json(err));
}

module.exports.updateUsuario = (request, response) =>{

    const bool1 = request.body.nombre !== '' && request.body.apellido !== '' && request.body.img !== '' && request.body.cedula !== '' && request.body.username !== '' && request.body.passwd !== '' && request.body.confirmPassword !== '';
    const bool2 = request.body.passwd === request.body.confirmPassword;


    if(bool1){
        if(bool2){
            Usuario.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
                .then(updatedUsuario =>{
                    response.json({updatedUsuario: updatedUsuario, msg:'Usuario ha sido actualizado', bool: true});
                })
                .catch(err => response.json({err: err, msg: 'Error al actualizar el usuario'}));
        }else{
            response.json({ msg: 'Las contraseñas deben coincidir', bool: false })
        }

    }else{
        response.json({ msg: 'Ningún campo debe estar vacío', bool: false })
    }
}

module.exports.deleteUsuario = (request, response) =>{
    Usuario.deleteOne({_id: request.params.id})
    .then(usuarioDeleted => response.json(usuarioDeleted))
    .catch(err => response.json(err))
}

module.exports.validateUsuario = (req, res) => {

    Usuario.findOne({ username:req.body.username })
        .then(userFound => {
            if(userFound.passwd === req.body.passwd){
                res.json({ msg: true, user: userFound });
            }else{
                res.json({ msg: false });
            }
        })
        .catch(err => {
            res.json(err);
            console.log(err);
        });
        
}