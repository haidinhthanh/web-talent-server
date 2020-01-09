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
        var newspapers = await NewspaperModel.find()
        console.log(newspapers.length)

        for( let i=0; i<newspapers.length; i++){
            await NewspaperModel.deleteOne({"_source.processor_category_classify": {$ne:"Công nghệ"}})
        }
        // Promise.all(await newspapers.map((item)=>{
        //     NewspaperModel.deleteMany({"_id": item._id})
        // })).then(()=>{
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
        var newspaper = await NewspaperModel.find().count((err, num)=>{
            res.json({"data": num})
        })
    } catch (error) {
        res.json({
            message: error
        });
    }
}

exports.getNOPostsLocationType =async (req, res)=>{
    try {
        var loc = req.params.loc
        if(loc=="vn"){
            var query ={
                $or:[
                    {"_source.processor_ner_loc.cities": { $exists: true, $not: {$size: 0}}},
                    {"_source.processor_ner_loc.provinces": {$exists:true, $not: {$size: 0}}},
                    {"_source.processor_ner_loc.nations": "Việt Nam"}
                ]
            }
            var data = await NewspaperModel.find(query).count((err, num)=>{
                res.json({"data": num})
            })
        }
        else{
            var query ={"_source.processor_ner_loc.nations": {$ne: "Việt Nam"}}
            
            var data = await NewspaperModel.find(query).count((err, num)=>{
                res.json({"data": num})
            })
        }
    } catch (error) {
        res.json({
            message: error
        });
    }
}
exports.getNOPostsFeatureType =async (req, res)=>{
    try {
        var type = req.params.type
        if(type=="Salary"){
            var query ={
                "_source.processor_talent_info.Salary": { $exists: true, $not: {$size: 0}}
            }
            var data = await NewspaperModel.find(query).count((err, num)=>{
                res.json({"data": num})
            })
        }
        else if(type=="Regime"){
            var query ={
                $or:[
                    {"_source.processor_talent_info.Regime": {$exists:true, $not: {$size: 0}}}
                ]
            }
            var data = await NewspaperModel.find(query).count((err, num)=>{
                res.json({"data": num})
            })
        }
        else if(type=="Environment"){
            var query ={
                $or:[
                    {"_source.processor_talent_info.Environment": {$exists:true, $not: {$size: 0}}}
                ]
            }
            var data = await NewspaperModel.find(query).count((err, num)=>{
                res.json({"data": num})
            })
        }
    } catch (error) {
        res.json({
            message: error
        });
    }
}
exports.getPostsByTypeFeature =async (req, res)=>{
    try {
        var type = req.params.type
        var no_post = req.params.no_post
        var from = req.params.from
        if(type=="Salary"){
            var query ={
                $or:[
                    {"_source.processor_talent_info.Salary": { $exists: true, $not: {$size: 0}}}
                ]
            }
            var data = await NewspaperModel.find(query).skip(parseInt(from)).limit(parseInt(no_post))
            res.json({
                data : data
            })
        }
        else if(type=="Regime"){
            var query ={
                $or:[
                    {"_source.processor_talent_info.Regime": {$exists:true, $not: {$size: 0}}}
                ]
            }
            var data = await NewspaperModel.find(query).skip(parseInt(from)).limit(parseInt(no_post))
            res.json({
                data : data
            })
        }
        else if(type=="Environment"){
            var query ={
                $or:[
                    {"_source.processor_talent_info.Environment": {$exists:true, $not: {$size: 0}}}
                ]
            }
            var data = await NewspaperModel.find(query).skip(parseInt(from)).limit(parseInt(no_post))
            res.json({
                data : data
            })
        }
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
        var sort_data = await NewspaperModel.find({}).sort({no_view: -1}).skip(parseInt(from)).limit(parseInt(no_post))
        res.json({
                    data : sort_data,
                })
    } catch (error){
        res.json({
            message: error
        });
    }
}

exports.getRecentPosts = async (req, res)=>{
    try{
        var sort_data = await NewspaperModel.find({}).sort({date: -1}).limit(20)
        res.json({
            data : sort_data
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
        var from = req.params.from
        if(loc=="vn"){
            var query ={
                $or:[
                    {"_source.processor_ner_loc.cities": { $exists: true, $not: {$size: 0}}},
                    {"_source.processor_ner_loc.provinces": {$exists:true, $not: {$size: 0}}},
                    {"_source.processor_ner_loc.nations": "Việt Nam"}
                ]
            }
            var data = await NewspaperModel.find(query).skip(parseInt(from)).limit(parseInt(no_post))
            res.json({
                data : data
            })
        }
        else{
            var query ={"_source.processor_ner_loc.nations": {$ne: "Việt Nam"}}
            
            var data = await NewspaperModel.find(query).limit(10)
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

exports.searchPosts = async (req, res)=>{
    try{
        var query = req.params.query
        var startDate = req.params.startDate
        var endDate = req.params.endDate
        var loc = req.params.loc
        var cate = req.params.cate
        var tag = req.params.tag
        var from = req.params.from
        var no = req.params.no
        var query_sum = {$and: []}
        var query_tag = null
        var query_loc = null;
        var query_text = null;
        var query_cate = null;
        if(tag == "Salary"){
            query_tag = {"_source.processor_talent_info.Salary": { $exists: true, $not: {$size: 0}}}
        }
        else if(tag == "Environment"){
            query_tag = {"_source.processor_talent_info.Environment": { $exists: true, $not: {$size: 0}}}
        }
        else if(tag == "Regime"){
            query_tag = {"_source.processor_talent_info.Regime": { $exists: true, $not: {$size: 0}}}
        }
        if(query_tag != null){
            query_sum.$and.push(query_tag)
        }
        if(loc =="Việt Nam"){
            query_loc = {$or:[
                {"_source.processor_ner_loc.cities": { $exists: true, $not: {$size: 0}}},
                {"_source.processor_ner_loc.provinces": {$exists:true, $not: {$size: 0}}},
                {"_source.processor_ner_loc.nations": "Việt Nam"},
            ]}}
        else{
            query_loc = {"_source.processor_ner_loc.nations": {$ne:"Việt Nam"}}
        }
        if(loc != "empty"){
            query_sum.$and.push(query_loc)
        }
        if(query != "empty"){
            query_text =  {$or:[
                {"_source.title": {$regex : ".*"+query+".*"}},
                {"_source.summary": {$regex : ".*"+query+".*"}},
                {"_source.content": {$regex : ".*"+query+".*"}}
            ]}
            query_sum.$and.push(query_text)
        }
        if(cate != "empty"){
            query_cate = {"_source.processor_category_classify": cate}
            query_sum.$and.push(query_cate)
        }
        startTime = new Date(startDate)
        endTime = new Date(endDate)
        if( startTime.getTime() < endTime.getTime()){
            query_sum.$and.push({"_source.published_date": {"$gte": startTime, "$lte": endTime}})
        }else{
            query_sum.$and =[]
        }
        
        if(query_sum.$and.length == 0){
            res.json({
                data : []
            })
        }
        else{
            var data = await NewspaperModel.find(query_sum).skip(parseInt(from)).limit(parseInt(no))
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

exports.getNoSearchPosts = async (req, res)=>{
    try{
        var query = req.params.query
        var startDate = req.params.startDate
        var endDate = req.params.endDate
        var loc = req.params.loc
        var cate = req.params.cate
        var tag = req.params.tag
        var from = req.params.from
        var no = req.params.no
        var query_sum = {$and: []}
        var query_tag = null
        var query_loc = null;
        var query_text = null;
        var query_cate = null;
        if(tag == "Salary"){
            query_tag = {"_source.processor_talent_info.Salary": { $exists: true, $not: {$size: 0}}}
        }
        else if(tag == "Environment"){
            query_tag = {"_source.processor_talent_info.Environment": { $exists: true, $not: {$size: 0}}}
        }
        else if(tag == "Regime"){
            query_tag = {"_source.processor_talent_info.Regime": { $exists: true, $not: {$size: 0}}}
        }
        if(query_tag != null){
            query_sum.$and.push(query_tag)
        }
        if(loc =="Việt Nam"){
            query_loc = {$or:[
                {"_source.processor_ner_loc.cities": { $exists: true, $not: {$size: 0}}},
                {"_source.processor_ner_loc.provinces": {$exists:true, $not: {$size: 0}}},
                {"_source.processor_ner_loc.nations": "Việt Nam"},
            ]}}
        else{
            query_loc = {"_source.processor_ner_loc.nations": {$ne:"Việt Nam"}}
        }
        if(loc != "empty"){
            query_sum.$and.push(query_loc)
        }
        if(query != "empty"){
            query_text =  {$or:[
                {"_source.title": {$regex : ".*"+query+".*"}},
                {"_source.summary": {$regex : ".*"+query+".*"}},
                {"_source.content": {$regex : ".*"+query+".*"}}
            ]}
            query_sum.$and.push(query_text)
        }
        if(cate != "empty"){
            query_cate = {"_source.processor_category_classify": cate}
            query_sum.$and.push(query_cate)
        }
        startTime = new Date(startDate)
        endTime = new Date(endDate)
        if( startTime.getTime() < endTime.getTime()){
            query_sum.$and.push({"_source.published_date": {"$gte": startTime, "$lte": endTime}})
        }
        else{
            query_sum.$and =[]
        }
        if(query_sum.$and.length == 0){
            res.json({
                data : 0
            })
        }
        else{
            await NewspaperModel.find(query_sum).count((err, num)=>{
                res.json({"data": num})
            })
        }
    } catch (error){
        res.json({
            message: error
        });
        
    }   
}