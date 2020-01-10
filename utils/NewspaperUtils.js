var NewspaperModel = require("../model/Newspaper.model")
var CategoryModel = require("../model/Category.model")
var LocationModel = require("../model/Location.model")
var TagModel = require("../model/Tag.model")
var MathUtils = require("../utils/Math")
var request = require("request");
var fs = require("fs");
var username = "elastic",
    password = "elasticbk",
    url_count = "http://54.68.196.78:9200/talent-cleaned/_count",
    url_search = "http://54.68.196.78:9200/talent-cleaned/_search",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

const createNews = async (item, no_view_rd)=>{
    var news = await NewspaperModel.findById({"_id": item._id})
        if(news == null){
            await NewspaperModel.create({
                _id: item._id,
                _source: item._source,
                no_view: no_view_rd
            }).then(()=>{
                var date = new Date().toISOString().slice(0,10).replace(":","_") +".txt"
                fs.appendFile('./log/'+date, 'index url ' + item._source.url , function (err) {
                    if (err) throw err;
                    
                  });
            })
        }
}

const updateCategory = async (item, no_view_rd)=>{
    var cate = await CategoryModel.findById({_id: item._source.processor_category_classify})
        if(cate ==  null){
            await CategoryModel.create({
                _id: item._source.processor_category_classify,
                name: item._source.processor_category_classify,
                no_post: 1,
                no_view: no_view_rd
            }, function(err, values){
                if(err){
                    console.log("err " + err)
                }
                else{
                    console.log("res " + values)
                }
            })
        }
        else{
            await CategoryModel.updateOne(
                { _id: item._source.processor_category_classify }
                ,{
                    $inc: {
                        no_post: 0.5,
                        no_view: no_view_rd*0.5
                    }
                } 
                ,function(err, raw){
                    if(err){
                        console.log("err " + err)
                    }
                })
            console.log( await CategoryModel.find({_id: item._source.processor_category_classify}))
        }
}

const updateLocation = async (item, no_view_rd)=>{
    try{
        var item_cities = item._source.processor_ner_loc.cities
        var item_nations = item._source.processor_ner_loc.nations
        var item_provinces = item._source.processor_ner_loc.provinces

        if(item_cities.length>0){
            for(let i=0; i< item_cities.length; i++){
                await LocationModel.findById({"_id": item_cities[i] + " city"}, 
                    function (err, location) {
                        if(location){
                            LocationModel.updateOne({"_id": item_cities[i] + " city"},
                            { 
                                $inc: { 
                                    no_post: 1, 
                                    no_view: no_view_rd
                                },
                            },
                            function(err, response) {
                                if (err) {
                                    console.log("error " + err)
                            } else {
                                    console.log("update loction city " + item_cities[i])
                            }
                            })
                        }
                        else{
                            LocationModel.create({
                                _id: item_cities[i] + " city",
                                name: item_cities[i],
                                type: "city",
                                type_world: "Việt Nam",
                                no_post: 1,
                                no_view: no_view_rd
                            },)
                        }
                })
            }
        }
        if(item_nations.length > 0){
            for(let i=0; i < item_nations.length; i++){
                await LocationModel.findById({"_id": item_nations[i] + " nation"}, 
                    function (err, location) {
                        if(location){
                            LocationModel.updateOne({"_id": item_nations[i] + " nation"},
                            { 
                                $inc: { 
                                    no_post: 1, 
                                    no_view: no_view_rd
                                },
                            },
                            function(err, response) {
                                if (err) {
                                    console.log("error " + err)
                            } else {
                                    console.log("update loction nations " + item_nations[i])
                            }
                            })
                        }
                        else{
                            var type_world = "Việt Nam"
                            if (item_nations != type_world){
                                type_world = "World"
                            }
                            LocationModel.create({
                                _id: item_nations[i] + " nation",
                                name: item_nations[i],
                                type: "nation",
                                type_world: type_world,
                                no_post: 1,
                                no_view: no_view_rd
                            })
                        }
                })
            }
        }
        if(item_provinces.length>0){
            for(let i=0; i< item_provinces.length; i++){
                await LocationModel.findById({"_id": item_provinces[i] + " province"}, 
                    function (err, location) {
                        if(location){
                            LocationModel.updateOne({"_id": item_provinces[i] + " province"},
                            { 
                                $inc: { 
                                    no_post: 1, 
                                    no_view: no_view_rd
                                },
                            },
                            function(err, response) {
                                if (err) {
                                    console.log("error " + err)
                            } else {
                                    console.log("update loction province " + item_provinces[i])
                            }
                            })
                        }
                        else{
                            LocationModel.create({
                                _id: item_provinces[i] + " province",
                                name: item_provinces[i],
                                type: "province",
                                type_world: "Việt Nam",
                                no_post: 1,
                                no_view: no_view_rd
                            })
                        }
                })
            }
        }
    } catch (error) {
        console.log( {message: error});
    }
}

const updateTag = async (item, no_view_rd)=>{
    try {
        var item_salary = item._source.processor_talent_info.Salary
        var item_env = item._source.processor_talent_info.Environment
        var item_regime = item._source.processor_talent_info.Regime
        for(let i=0; i<item_salary.length; i++){
                await TagModel.findById({"_id": item_salary[i] + " Salary"}, 
                function (err, location) {            
                    if(location){
                        TagModel.updateOne({"_id": item_salary[i] + " Salary"},
                        { 
                            $inc: { 
                                no_post: 1, 
                                no_view: no_view_rd
                            },
                        },
                        function(err, response) {
                            if (err) {
                                console.log("error " + err)
                        } else {
                                console.log("update tag salary " + item_salary[i])
                        }
                        })
                    }
                    else{
                        TagModel.create({
                            _id: item_salary[i] + " Salary",
                            name: item_salary[i],
                            type: "Salary",
                            no_post: 1,
                            no_view: no_view_rd
                        })
                        console.log("create tag " + item_salary[i]) 
                    }
                })
            } 
        for(let i=0; i<item_env.length; i++){
                await TagModel.findById({"_id": item_env[i] + " Environment"}, 
                function (err, location) {
                    if(location){
                        TagModel.updateOne({"_id": item_env[i] + " Environment"},
                        { 
                            $inc: { 
                                no_post: 1, 
                                no_view: no_view_rd
                            },
                        },
                        function(err, response) {
                            if (err) {
                                console.log("error " + err)
                        } else {
                                console.log("update tag environment " + item_env[i])
                        }
                        })
                    }
                    else{
                        TagModel.create({
                            _id: item_env[i] + " Environment",
                            name: item_env[i],
                            type: "Environment",
                            no_post: 1,
                            no_view: no_view_rd
                        })
                        console.log("create tag " + item_env[i]) 
                    }
                })
            } 
        
        for(let i=0; i<item_regime.length; i++){
                await TagModel.findById({"_id": item_regime[i] + " Regime"}, 
                function (err, location) {
                    if(location){
                        TagModel.updateOne({"_id": item_regime[i] + " Regime"},
                        { 
                            $inc: { 
                                no_post: 1, 
                                no_view: no_view_rd
                            },
                        },
                        function(err, response) {
                            if (err) {
                                console.log("error " + err)
                        } else {
                                console.log("update tag regime " + item_regime[i])
                        }
                        })
                    }
                    else{
                        TagModel.create({
                            _id: item_regime[i] + " Regime",
                            name: item_regime[i],
                            type: "Regime",
                            no_post: 1,
                            no_view: no_view_rd
                        })
                        console.log("create tag " + item_regime[i]) 
                    }
                })
            }
        
    } catch (error) {
        console.log( {message: error});
    }
}

const createNewsPaperAndUpdateStatistical = async (item, no_view_rd)=>{
    try {
        await createNews(item, no_view_rd)
        await updateCategory(item, no_view_rd)
        await updateLocation(item, no_view_rd)
        await updateTag(item, no_view_rd)
    } catch (error) {
        console.log({error: error});
    }
}

const getTalentCleanedFromElasticSearchServer = (callback, hits) => {
    request.get({    
        url : url_search,
        headers : {
            "Authorization" : auth,
            "Content-Type": 'application/json',
        },
        body:JSON.stringify({
            "query": {
                "range" : {
                    "indexed_date" : {
                        "gte" : "2015-12-10T10:17:07Z",
                        "lte" :  "now/d"
                    }
                }
            },
            "size": hits
        })
    },
    (err, res, body) => {
        if (err) { 
            return callback(err);
        }
        return callback(body);
    });
}

//2015-12-10T10:17:07Z  now-1d/d

exports.getFreshNewspaperFromElastic = async (req, res)=>{
    var date = new Date().toISOString().slice(0,10).replace(":","_") +".txt"
    createFile("./log/"+ date)
    request.get({    
        url : url_count,
        headers : {
            "Authorization" : auth,
            "Content-Type": 'application/json',
        },
        body:JSON.stringify({
            "query": {
                "range" : {
                    "indexed_date" : {
                        "gte" : "2015-12-10T10:17:07Z",
                        "lte" :  "now/d"
                    }
                }
            }
        })
    }, function(error, response, body){
        if(error){
            console.log({
                status: 'Error',
                message: 'Error!'
            })
        }
        var hits = JSON.parse(body).count
        getTalentCleanedFromElasticSearchServer(
            function(response){
                createUpdate(response)
            }, hits
        )
    })
}

const createUpdate = async (response) =>{
    var values = JSON.parse(response).hits.hits;
    processArray(values)
}

async function processArray(array) {
    for (const item of array) {
      await delayedLog(item);
    }
    console.log('Done!');
}

function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}
  
async function delayedLog(item) {
    await delay();
    console.log(new Date().getSeconds());
    await createNewsPaperAndUpdateStatistical(item, MathUtils.getRandomInt(1000));
}
  

function createFile(filename) {
    fs.open(filename,'r',function(err, fd){
      if (err) {
        fs.writeFile(filename, '', function(err) {
            if(err) {
                console.log(err);
            }
            console.log("The file was saved!");
        });
      } else {
        console.log("The file exists!");
      }
    });
  }