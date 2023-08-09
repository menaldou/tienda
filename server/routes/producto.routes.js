const ProductoController = require('../controllers/producto.controller');

module.exports = function(app){
    app.post('/api/producto/new', ProductoController.createProducto);
    app.get('/api/productos', ProductoController.getAllProductos);
    app.get('/api/producto/:id',ProductoController.getProducto);
    app.put('/api/producto/:id/edit',ProductoController.updateProducto);
    app.delete('/api/producto/:id/delete', ProductoController.deleteProducto);
}