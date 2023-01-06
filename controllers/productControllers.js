const _ = require('lodash');
const { Product, validate } = require('../models/product');
const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');

const dbcon = async () => {
    await mongoose.connect(process.env.MONGODB_URL_LOCAL);
    console.log("Connection successfull");
}

if (mongoose.connection.readyState === 0) {
    dbcon();
}


module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("Something went wrong");
        const { error } = validate(_.pick(fields, ['name', 'description', 'price', 'category', 'quantity']));
        if (error) return res.status(400).send(error.details[0].message);
        const product = new Product(fields);
        if (files.photo) {
            console.log(files.photo);
            fs.readFile(files.photo.filepath, (err, data) => {
                if (err) return res.status(400).send("Problem in file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) res.status(500).send("Internal Server Error");
                    else return res.status(201).send({
                        message: "product created successfully",
                        data: _.pick(result, ['name', 'description', 'price', 'category', 'quantity'])
                    })
                });
            })
        } else {
            return res.status(400).send("No image provided");
        }

    })
}

module.exports.getProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).send(products);
}

module.exports.updateProductsById = async (req, res) => {

}

module.exports.getProductsById = async (req, res) => {

}