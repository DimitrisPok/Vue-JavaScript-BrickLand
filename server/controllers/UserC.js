var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const User = require("../schemas/User");


//post user
router.post('/users',function(req, res){
    User.create(req.body).then(function(user){
        res.send(user);
    }); //the 'User' is the one being imported in the beginning 
    
});

//update all info about user
router.put('/users/:id',function(req, res){
    res.json({type:'PUT'});
});

/* delete a user from database */
router.delete('/users/:id',function(req, res){
    res.json({type:'DELETE'});
});

//get all the users
router.get('/users',function(req, res){
    res.json({type:'GET'});
});

module.exports = router;