const express = require('express');
const productRouter = require('./routes/productRouter');

const app = express()

//Middlewares
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, DELETE, PATCH');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(express.json())
app.use(express.static('public'))

//Rutas de la aplicacion
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})
app.use('/api/v1/products', productRouter)

module.exports = app;