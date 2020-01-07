const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LocationSchema = new Schema({
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
    type_world:{
        type: String
    },
    no_post: {
        type: Number
    },
    no_view:{
        type: Number
    }
})

module.exports = Location = mongoose.model("location",LocationSchema)