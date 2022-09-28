var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');




//calling the router
var router = express.Router();

//using another file in the app
//var v1 = require('./extras/v1')
var post = require('./controllers/Posts');
//var signup = require('./extras/signup')

var user = require('./controllers/Users');
var review = require('./controllers/Reviews');



// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Group21:26i4vNezpiAqElok@legomodels.1y6koci.mongodb.net/?retryWrites=true&w=majority';
var port = process.env.PORT || 3000;



// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

mongoose.Promise = global.Promise;

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//using the controllers
app.use(user);
//app.use(v1);
app.use(post);
app.use(review);


// HTTP request logger
app.use(morgan('dev'));
app.use(bodyParser.json())
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

//using v1
//app.use(v1);
//app.use(signup);
//app.use(user);
//app.use(review);

// Import routes
/* app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project! '});
});*/

// Catch all non-error handler for api (i.e., 404 Not Found)
/*app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});*/

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
// create storage for camels

/*
//creatin post for user.............
var users = require('../server/schemas/User');
const { post } = require('./routes/signup');
const router = require('./routes/signup');
*/
/*
app.post('/users', function(req, res){
var user = new users(req,res);
user.save()
res.send({
    type: post,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email
});
console.log("tits")
});
*/

/*app.post('/user', function(req,res){
    users.create(req.body).then(function(user){
        res.send(user);
    })
});*/



