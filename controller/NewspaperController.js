const NewspaperService = require("../services/NewspaperService")

exports.getAll = (req, res) => {
    return NewspaperService.getALl(req, res);
}
exports.deleteAll = (req, res)=>{
    return NewspaperService.deleteAll(req,res);
}
exports.getN0Posts = (req, res)=>{
    return NewspaperService.getN0Posts(req, res);
}
exports.getPopularPosts = (req, res)=>{
    return NewspaperService.getPopularPosts(req, res);
}
exports.getRecentPosts = (req, res)=>{
    return NewspaperService.getRecentPosts(req, res)
}

exports.getPostById = (req, res)=>{
    return NewspaperService.getPostById(req, res)
}
exports.getPostByTypeLocation = (req, res)=>{
    return NewspaperService.getPostByTypeLocation(req, res)
}
exports.getNOPostsLocationType =(req, res)=>{
    return NewspaperService.getNOPostsLocationType(req, res)
}
exports.getNOPostsFeatureType = (req, res)=>{
    return NewspaperService.getNOPostsFeatureType(req, res)
}
exports.getPostsByTypeFeature =(req, res)=>{
    return NewspaperService.getPostsByTypeFeature(req, res)
}

exports.searchPosts =(req, res)=>{
    return NewspaperService.searchPosts(req, res)
}

exports.getNoSearchPosts =(req, res)=>{
    return NewspaperService.getNoSearchPosts(req, res)
}
exports.getPostByCategory = (req, res)=>{
    return NewspaperService.getPostByCategory(req, res)
}
exports.getNoCategoryPost = (req, res)=>{
    return NewspaperService.getNoCategoryPost(req, res)
}
exports.updateView = (req, res) =>{
    return NewspaperService.updateView(req, res)
}