// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

let url = require('url');

const bodyparser=require('body-parser');
const path=require('path');
const cors=require('cors');
const http = require('http');

const mysqlconfig = require('./mySqlConnection')

var originsWhitelist = [
    '*',
    'http://localhost:4200',
    'http://localhost:4545',
    
    'C:/Hybrid_Skeleton_Application/JqueryAjax/JqueryAppWithNode.html'
];
var corsOptions = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}

// http.createServer(function (request, response) {
//     console.log("kasjdbaksjbkjasblkjba")
//     response.writeHead(200, {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
//         'Content-Type': 'text/plain',
//         "Access-Control-Allow-Credentials" : false
//     });
// });




// Initialize the app
let app = express();


app.use(cors(corsOptions));

// app.use(function(req, res) {
//     cors(corsOptions);
//    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// });

app.use(bodyparser.json());

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', 
{ useUnifiedTopology: true,useNewUrlParser: true})
.then(()=> console.log("DB connected"))
.catch((err)=>console.log("error ",err));

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });

//var db = mongoose.connection;

// Added check for DB connection

// if(!db)
//     console.log("Error connecting db")
// else
//     console.log("Db connected successfully")



// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});