var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const User = require('../schemas/User');


/* GET sign up page. */
router.get('/',function(req, res, next){
    res.render('index', {title: 'Express'});
});

//router.post('/signup', (req, res) 

/* get a ist of users from the db */
router.get('/users',function(req, res){
    res.json({type:'GET'});
});

/* to add a new user and get info through postman test */
/*router.post('/users',function(req, res){
    console.log(req.body);
    res.json({
        type:'POST',
        name: req.body.name,
        password:req.body.password,
        email: req.body.email });
});/*

/* to add a new user to the database by creating a new instance and saving them seperately*/
/*router.post('/users',function(req, res){
    var user = new User(req.body);
    user.save();
    res.json({
        type:'POST',
        name: req.body.name,
        password:req.body.password,
        email: req.body.email });
});
/*

/* to add a new user to the database with a mongoose method, shorter way*/
router.post('/users',function(req, res){
    User.create(req.body).then(function(user){
        res.send(user);
    }); //the 'User' is the one being imported in the beginning 
    
});

/* update a user in the database */
router.put('/users/:id',function(req, res){
    res.json({type:'PUT'});
});

/* delete a user from database */
router.delete('/users/:id',function(req, res){
    res.json({type:'DELETE'});
});





module.exports = router; 