const mongoose = require('mongoose');
const db_name = 'tienda_db';
mongoose.connect(`mongodb://localhost/${db_name}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Conexión establecida a la base de datos ${db_name}`))
    .catch(err => console.log("Algo ha sucedido al tratar de conectar a la base de datos ", err));