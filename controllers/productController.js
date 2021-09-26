const AppError = require('./../utils/appError');
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res) => {
    // console.log(req.body)

    //in case the select is done for one item with a /products?id='', else if route is /products/:id it will be handle by that route handler, or create a middleware to take care of it
    if (req.query.id) {
        const data = await Product.findById(req.query.id)
        res.status(200).json({
            message: "Success",
            data
        })
    }
    const data = await Product.find()

    res.status(200).json({
        message: "Success",
        data
    })
})

exports.getOneProduct = catchAsync(async (req, res) => {
    // console.log(req.params)
    const id = req.params.id || req.query.id
    const data = await Product.findById(id)
    res.status(200).json({
        message: "Success",
        data
    })
})

exports.addProduct = catchAsync(async (req, res) => {
    const data = await Product.create(req.body)
    res.status(201).json({
        message: "Success",
        data
    })
})

exports.updateProduct = catchAsync(async (req, res, next) => {
    // console.log(req.body)
    const id = req.query.id || req.params.id
    const data = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidator: true
    });

    if (!data) {
        return next(new AppError('No se encontro ningun producto con ese ID', 404))
    }

    res.status(200).json({
        message: "Success",
        data
    })
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const id = req.query.id || req.params.id
    const data = await Product.findByIdAndDelete(id);

    if (!data) {
        return next(new AppError('No se encontro ningun producto con ese ID', 404))
    }

    res.status(204).json({
        message: "Success",
        data: null
    })
})