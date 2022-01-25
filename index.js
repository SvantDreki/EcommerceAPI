const express = require('express');
const conectarBD = require('./config/db');

require('dotenv').config({path: 'variables.env'});

const app = express();

conectarBD();

app.use( express.json() );

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/products', require('./routes/product'));
app.use('/api/carts', require('./routes/cart'));
app.use('/api/orders', require('./routes/order'));

const PORT = process.env.PORT || 4000;

app.listen( PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
} )


//1:45:00