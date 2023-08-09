//se realiza la importacion
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

require('./config/mongoose.config')

//middleware
app.use(cors()); //esto es la parte nueva
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const productoRoutes = require('./routes/producto.routes');
const proveedorRoutes = require('./routes/proveedor.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const ventaRoutes = require('./routes/venta.routes');

productoRoutes(app);
proveedorRoutes(app);
usuarioRoutes(app);
ventaRoutes(app);

app.listen(port, () => console.log("Server is listening at port", port));