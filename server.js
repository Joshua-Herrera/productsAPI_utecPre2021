const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Atrapando excepciones de inicio en produccion
if (process.env.NODE_ENV === 'prod') {
    procces.on('uncaughtException', (err) => {
        console.log(err.name, err.message);
        console.log('Se ha encontrado una exception no especificada, cerrando app...')
        process.exit(1)
    })
}

//Configuracion del servidor
dotenv.config({ path: './config.env' })
console.log(`env: ${process.env.NODE_ENV}`)

//Connectando a la BD de Mongo en Atlas
mongoose.connect(process.env.DB_URI).then(() => {
    console.log('La conexion a la base de datos fue un exito')
});

const app = require('./app');

//Inicio del servidor de nodejs en express
const server = app.listen(process.env.PORT, () => {
    console.log(`App corriendo en el puerto ${process.env.PORT}...`)
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Rechazo inesperado, cerrando app...');
    server.close(() => {
        process.exit(1);
    });
})