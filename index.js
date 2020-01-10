let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require("cors")
let apiRoutes = require("./routes/api/api-routes")
let newspaperApi = require("./routes/api/newspaper")
let statisticalApi = require("./routes/api/statistical")
let newspaperUtils = require("./utils/NewspaperUtils")
let app = express();
var port = process.env.PORT ||8080;
// body parser
app.use(cors())
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

// connect mongodb
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

//api
app.use('/api', apiRoutes)
app.use('/api/newspaper', newspaperApi)
app.use('/api/statistical', statisticalApi)
////
app.get('/', (req, res) => res.send('Hello World with Express'));

var CronJob = require('cron').CronJob;
var job = new CronJob('00 13 14 * * *', function(req, res) {
    console.log("chay luc 23h 30 .........")
    newspaperUtils.getFreshNewspaperFromElastic(req, res)
  }, 
  true,
  'Etc/UTC' 
);
job.start()
var server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));
server.timeout = 90000;
