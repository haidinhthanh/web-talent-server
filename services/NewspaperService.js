const NewspaperModel = require("../model/Newspaper.model")
exports.getALl = async (req, res) => {
    try {
        var newspaper = await NewspaperModel.find()
        res.json({"data": newspaper})
    } catch (error) {
        res.json({
            message: error
        });
    }
}


exports.deleteAll = async(req, res)=>{
    try {
        var newspaper = await NewspaperModel.find()
        for( let i=0; i<newspaper.length; i++){
            await NewspaperModel.deleteOne(newspaper[i])
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

exports.getN0Posts = async (req, res)=>{
    try {
        var newspaper = await NewspaperModel.find()
        res.json({"data": newspaper.length})
    } catch (error) {
        res.json({
            message: error
        });
    }
}

exports.getPopularPosts = async (req, res)=>{
    try{
        var from = parseInt(req.params.from)
        var no_post = parseInt(req.params.no_post)
        var sort_data = await NewspaperModel.find({}).sort({no_view: -1})
        if( sort_data.length < from + no_post && from < sort_data.length){
            var data = sort_data.slice(from, sort_data.length)
            res.json({
                data : data,
            })
        }   
        else if(sort_data.length< from){
            res.json({
                data : [],
            })
        }
        else{
            var data = sort_data.slice(from, from + no_post)
            res.json({
                data : data,
            })
        }
    } catch (error){
        res.json({
            message: error
        });
    }
}

exports.getRecentPosts = async (req, res)=>{
    try{
        var sort_data = await NewspaperModel.find({}).sort({date: -1})
        res.json({
            data : sort_data.slice(0,20)
        })
    
    } catch (error){
        res.json({
            message: error
        });
    }   
}

exports.getPostById = async (req, res)=>{
    try{
        var _id = req.params.id
        var data = await NewspaperModel.findOne({"_id": _id})
        res.json({
            data : data
        })
    
    } catch (error){
        res.json({
            message: error
        });
    }   
}

exports.getPostByTypeLocation = async (req, res)=>{
    try{
        var loc = req.params.loc
        var no_post = req.params.no_post
        var from = req.params.no_post
        if(loc=="Việt nam"){
            var query ={
                $or:[
                    {cities: { $exists: true, $not: {$size: 0}}},
                    {provinces: {$exists:true, $not: {$size: 0}}},
                    {nations: {$in:"Việt Nam"}}
                ]
            }
            var data = await NewspaperModel.find(query)[from, no_post]
            res.json({
                data : data
            })
        }
        else{
            var query ={nations:{$not:{$ne:"Việt Nam"}}}
            
            var data = await NewspaperModel.find(query)[from, no_post]
            res.json({
                data : data
            })
        }
    } catch (error){
        res.json({
            message: error
        });
    }   
}