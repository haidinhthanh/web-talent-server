const StatisticalService = require("../services/StatisticalService")

// exports.getAll = (req, res) => {
//     return NewspaperService.getALl(req, res);
// }
// exports.deleteAll = (req, res)=>{
//     return NewspaperService.deleteAll(req,res);
// }
// exports.getN0Posts = (req, res)=>{
//     return NewspaperService.getN0Posts(req, res);
// }
// exports.getPopularPosts = (req, res)=>{
//     return NewspaperService.getPopularPosts(req, res);
// }
// exports.getRecentPosts = (req, res)=>{
//     return NewspaperService.getRecentPosts(req, res)
// }

// exports.getPostById = (req, res)=>{
//     return NewspaperService.getPostById(req, res)
// }

exports.getALLCategory = (req, res) => {
    return StatisticalService.getAllCategory(req, res)
}
exports.deleteAllCategory = (req, res) =>{
    return StatisticalService.deleteAllCategory(req, res)
}

exports.getALLTag = (req, res) =>{
    return StatisticalService.getAllTag(req, res)
}

exports.deleteAllTag = (req, res) =>{
    return StatisticalService.deleteAllTag(req, res)
}

exports.getALLLocation = (req, res) => {
    return StatisticalService.getAllLocation(req, res)
}

exports.deleteAllLocation = (req, res) =>{
    return StatisticalService.deleteAllLocation(req, res)
}


