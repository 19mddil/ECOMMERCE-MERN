const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const { User, validate } = require('../models/user');



module.exports.SignUp = async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = {};
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log("Connection successfull");
    }
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User Already Exists');
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user = await User.create(req.body);
    res.status(201).send({ messeage: "Registraton Successful", user: _.pick(user, ['name', 'email', 'password', 'role']), token: user.genJWT() });

}

module.exports.SignIn = async (req, res) => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log("Connection successfull");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("email or password error");
    const boolvar = await bcrypt.compare(req.body.password, user.password);
    if (boolvar) {
        res.status(201).send({ messeage: "Login Successful", user: _.pick(user, ['name', 'email', 'password', 'role']), token: user.genJWT() });
    } else {
        res.status(200).send("username or password error");
    }
}