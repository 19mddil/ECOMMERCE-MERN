const _ = require('lodash');
const { Product, validate } = require('../models/product');
const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');


module.exports.createProduct = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) return res.status(400).send("Something went wrong");
            const { error } = validate(_.pick(fields, ['name', 'description', 'price', 'category', 'quantity']));
            if (error) return res.status(400).send(error.details[0].message);
            const product = new Product(fields);
            if (files.photo) {
                // console.log(files.photo);
                fs.readFile(files.photo.filepath, (err, data) => {
                    if (err) return res.status(400).send("Problem in file data");
                    product.photo.data = data;
                    product.photo.contentType = files.photo.type;
                    product.save((err, result) => {
                        if (err) {
                            console.log(err.message); //what a joss mistake and trait of js.
                        }
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
    } catch (e) {
        return res.status(500).send("Internal Problem");
    }
}

//http://localhost:3001/api/product?sortBy=price&order=desc
module.exports.getProducts = async (req, res) => {
    try {
        let order = req.query.order === 'desc' ? -1 : 1;
        let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const products = await Product.find()
            .select({ photo: 0 })
            .sort({ [sortBy]: order })
            .limit(limit)
            .populate('category', 'name');
        return res.status(200).send(products);
    } catch (e) {
        return res.status(500).send("Internal Problem");
    }
}

module.exports.updateProductsById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("Something went wrong");
        const updatedFields = _.pick(fields, ['name', 'description', 'price', 'category', 'quantity']);
        _.assign(product, updatedFields);
        if (files.photo) {
            fs.readFile(files.photo.filepath, (err, data) => {
                if (err) return res.status(400).send("Problem in file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) res.status(500).send("Internal Server Error");
                    else return res.status(201).send({
                        message: "product updated successfully",
                        data: _.pick(result, ['name', 'description', 'price', 'category', 'quantity'])
                    })
                });
            })
        } else {
            product.save((err, result) => {
                if (err) res.status(500).send("Internal Server Error");
                else return res.status(201).send({
                    message: "product updated successfully",
                    data: _.pick(result, ['name', 'description', 'price', 'category', 'quantity'])
                })
            });
        }

    })
}

module.exports.getPhotoById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId)
            .select({ photo: 1, _id: 0 });
        res.set('Content-Type', product.photo.contentType);
        return res.status(200).send(product.photo.data);
    } catch (e) {
        return res.status(404).send("not found");
    }
}

module.exports.getProductsById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId)
            .select({ photo: 0 })
            .populate('category', 'name');
        return res.status(200).send(product);
    } catch (e) {
        return res.status(404).send("not found");
    }
}

const body = {
    order: 'desc',
    sortBy: 'price',
    limit: 6,
    skip: 20,
    filters: {
        price: [0, 1000],
        category: ['sdfasldfksd', 'lsdkfsfsfffsf', 'dslfslfsdfk']
    }
}

module.exports.filterProducts = async (req, res) => {
    console.log(req.body);
    let order = req.body.order === 'desc' ? -1 : 1;
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = parseInt(req.body.skip);
    let filters = req.body.filters;
    console.log(filters);
    let args = {};

    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === 'price') {
                args['price'] = {
                    $gte: filters['price'][0],
                    $lte: filters['price'][1]
                }
            }
            if (key === 'category') {
                args['category'] = {
                    $in: filters['category']
                }
            }
        }
    }

    console.log(args);
    const products = await Product.find(args)
        .select({ photo: 0 })
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .populate('category', 'name');
    return res.status(200).send(products);
}