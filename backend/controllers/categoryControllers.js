const _ = require('lodash');
const { Category, validate } = require('../models/category');
const mongoose = require('mongoose');

module.exports.createCategory = async (req, res) => {
    const { error } = validate(_.pick(req.body, ['name']));
    if (error) return res.status(400).send(error.details[0].message);


    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log("Connection successfull");
    }
    try {
        const category = await Category.create(_.pick(req.body, ['name']));
        return res.status(201).send({ messeage: "Category Creation Successful", category: _.pick(category, ['name']) });
    } catch (e) {
        console.log(e.code);
        return res.status(500).send(e.code === 11000 ? "Already Exists" : "Some unidentified problem");
    }
}

module.exports.getCategory = async (req, res) => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log("Connection successfull");
    }
    const categories = await Category.find().select({ _id: 1, name: 1 }).sort({ name: 1 });
    return res.status(200).send(categories);
}