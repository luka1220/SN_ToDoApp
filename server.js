
// BASE SETUP
// =============================================================================



var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path    = require('path'); 
var url     = require('url'); 
var regex = /.\../;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/data');


 // mongodb://localhost/test connect to our database mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected")
});

var ToDo     = require('./app/models/todo');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/todo') 
	.get(function(req,res){

	})
	
    .post(function(req, res) {
        var content = req.body.content; 
        var dead = req.body.deadline; 
        
        var todo = ToDo();
        todo.content = content; 
        todo.deadline = dead; 
        todo.prozentage = 0; 
        
        todo.save(function(err) {
                if (err){
                    console.log("error"); 
                    console.log(err);
                    res.send(err);
                }
                console.log("saved!"); 
                //res.json({ message: 'Todo created!' });
            });
        
        console.log(content + dead); 
        
        //res.json({ message: 'hooray! welcome to our api!' }); 
        res.sendFile(path.join(__dirname+'/app/index.html')); 
        });
        
router.route('todo/:id')
    .get(function(req, res) {
        
    })
    
    .put(function(req, res) {
        
    })
    
    .delete(function(req, res) {
        
    }); 

app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname+'/app/index.html')); 
}); 
app.get('/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    res.sendFile(path.join(__dirname+ pathname)); 
}); 

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
