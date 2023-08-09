const VentaController = require('../controllers/venta.controller');

module.exports = function(app){
    app.post('/api/venta/new', VentaController.createVenta);
    app.get('/api/ventas', VentaController.getAllVentas);
    app.get('/api/venta/:id',VentaController.getVenta);
    app.put('/api/venta/:id/edit',VentaController.updateVenta);
    app.delete('/api/venta/:id/delete', VentaController.deleteVenta);
}