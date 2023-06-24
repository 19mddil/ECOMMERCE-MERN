const { Schema, model } = require('mongoose');

const CartItemSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    price: Number,
    count: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

module.exports.CartItemSchema = CartItemSchema;
module.exports.CartItem = model('cartitems', CartItemSchema);