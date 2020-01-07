const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TagSchema = new Schema({
    _id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String
    },
    no_post: {
        type: Number
    },
    no_view:{
        type: Number
    }
})

module.exports = Tag = mongoose.model("tag",TagSchema)