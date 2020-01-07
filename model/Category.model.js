const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    _id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    no_post: {
        type: Number
    },
    no_view:{
        type: Number
    }
})

module.exports = Category = mongoose.model("category",CategorySchema)