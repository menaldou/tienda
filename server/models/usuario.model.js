const mongoose = require('mongoose');
const md5 = require('md5');

const UsuarioScheme = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Es necesario insertar el nombre de la persona'],
    },
    apellido: {
        type: String,
        required: [true, 'Es necesario insertar el apellido de la persona'],
    },
    img: {
        type: String,
        required: [true, 'Es necesario insertar una imagen'],
    },
    cedula: {
        type: String,
        required: [true, "Se requiere una cedula"],
    },
    username: {
        type: String,
        required: [true, 'Es necesario insertar el username de la persona'],
    },
    passwd: {
        type: String,
        required: [true, "Se requiere contraseña"]
    },
    admin: {
        type: String,
        required: [true, "se requiere elegir el tipo de usuario"]
    }
});

UsuarioScheme.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UsuarioScheme.pre('validate', function(next) {
    
    console.log(this.passwd, this.confirmPassword)

    if (this.passwd !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas deben coincidir');
    }
    next();
});

UsuarioScheme.pre('save', function(next) {
    this.passwd = md5(this.passwd);
    next();
});



const Usuario = mongoose.model('Usuario', UsuarioScheme);

module.exports = Usuario;