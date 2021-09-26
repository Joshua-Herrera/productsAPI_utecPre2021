const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    code: {
        type: String,
        require: [true, 'Ingrese el codigo del producto']
    },
    name:{
        type: String,
        require: [true, 'Ingrese el nombre del producto'],
        max: 30,
        min: 10
    },
    price: {
        type: Number,
        require: [true, 'Ingrese el precio del producto'],
        min: 0.01
    },
    stock: {
        type: Number,
        require: [true, 'Ingrese la cantidad de existencias del product'],
        default: 0
    }
})

module.exports =  mongoose.model('Product', productSchema)