const Category = require("../model/Category.model")
const Tag = require("../model/Tag.model")
const Location = require("../model/Location.model")

exports.getAllCategory = async (req, res) => {
    try {
        var category = await Category.find()
        console.log("create " + category )
        res.json({"data": category})
    } catch (error) {
        res.json({
            message: error
        });
    }
}
exports.deleteAllCategory = async (req, res) =>{
    try {
        var cate = await Category.find()
        for( let i=0; i<cate.length; i++){
            await Category.deleteOne(cate[i])
        }
        res.json({
            message: "sucess"
        })
    } catch (error) {
        res.json({
            message: error
        });
    }
}

exports.getAllTag = async (req, res) => {
    try {
        var tag = await Tag.find()
        res.json({"data": tag})
    } catch (error) {
        res.json({
            message: error
        });
    }
}
exports.deleteAllTag = async (req, res) =>{
    try {
        var tag = await Tag.find()
        for( let i=0; i<tag.length; i++){
            await Tag.deleteOne(tag[i])
        }
        res.json({
            message: "sucess"
        })
    } catch (error) {
        res.json({
            message: error
        });
    }
}

exports.getAllLocation = async (req, res) => {
    try {
        var location = await Location.find()
        res.json({"data": location})
    } catch (error) {
        res.json({
            message: error
        });
    }
}

exports.deleteAllLocation = async (req, res) =>{
    try {
        var location = await Location.find()
        for( let i=0; i<location.length; i++){
            await Location.deleteOne(location[i])
        }
        res.json({
            message: "sucess"
        })
    } catch (error) {
        res.json({
            message: error
        });
    }
}