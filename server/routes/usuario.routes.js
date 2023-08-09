const UsuarioController = require('../controllers/usuario.controller');

module.exports = function(app){
    app.post('/api/usuario/new', UsuarioController.createUsuario);
    app.get('/api/usuarios', UsuarioController.getAllUsuarios);
    app.get('/api/usuario/:id',UsuarioController.getUsuario);
    app.put('/api/usuario/:id/edit',UsuarioController.updateUsuario);
    app.delete('/api/usuario/:id/delete', UsuarioController.deleteUsuario);
    app.post('/api/usuario/validate', UsuarioController.validateUsuario);
}