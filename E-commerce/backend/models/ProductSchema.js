const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default:3
    },

  });

module.exports = mongoose.model('products', ProductSchema);