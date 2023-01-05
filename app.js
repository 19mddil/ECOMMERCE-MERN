require('express-async-errors');
const error = require("./middlewares/errors");
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("hello"));
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use(error);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


module.exports = app;