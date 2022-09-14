var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const User = require("../schemas/User");


//get all users
router.get('/users',function(req, res){
  User.find(function(err, users) {
       if (err){return res.status(500).send(err);}
  res.status(201).json({"user": users});
  });
});


// post user
router.post('/users', function(req,res, next){
  var user = new User(req.body);
  user.save(function(err){
      if (err){return res.status(500).send(err);}
  res.status(201).json({"user": user});
  });
});

//get user with id
router.get('/users/:id', function(req, res, next) {
  var id = req.params.id;
  User.findById(req.params.id, function(err, user) {
      if (err) { return next(err); }
      if (user == null) {
          return res.status(404).send(
                  {"message": "User not found"});
      }
      res.send(user);
      console.log(user);
  });
});

//to update an entire user 
router.put('/users/:id', function(req, res, next) {
  var id = req.params.id;
  User.findById(id, function(err, user) {
      if (err) { return next(err); }
      if (user == null) {
          return res.status(404).json({"message": "user not found"});
      }
      user.name = req.body.name;
      user.password = req.body.password;
      user.email = req.body.email;
      user.save();
      res.json(user);
  });
});

// to delete a user 
router.delete('/users/:id', function(req, res, next) {
  var id = req.params.id;
  User.findOneAndDelete({_id: id}, function(err, user) {
      if (err) { return next(err); }
      if (user == null) {
          return res.status(404).json(
                  {"message": "User not found"});
      }
      res.json(user);
  });
});

//to update certain attributes of a user 
router.patch('/users/:id', function(req, res, next) {
  var id = req.params.id;
  User.findById(id, function(err, user) {
      if (err) { return next(err); }
      if (user == null) {
          return res.status(404).json({"message": "user not found"});
      }
      user.name = req.body.name || user.name;
      user.password = req.body.password || user.password;
      user.email = req.body.email || user.email;
      user.save();
      res.json(user);
  });
});

//delete an entire collection
router.delete('/users', function(req, res, next) {
  User.deleteMany(function(err, users) {
      if (err) { return next(err); }
      if (users == null) {
          return res.status(404).json(
                  {"message": "There are no users!"});
      }
      res.status(201).json({"user": users});
  });
});




//post usernpm start
/*router.post('/users',function(req, res){
    User.create(req.body).then(function(user){
        res.send(user);
    }); //the 'User' is the one being imported in the beginning 
    
});

//update all info about user
router.put('/users/:id',function(req, res){
    res.json({type:'PUT'});
});/*

/* delete a user from database */
/*router.delete('/users/:id',function(req, res){
    res.json({type:'DELETE'});
});/*

//get all the users
/*router.get('/users',function(req, res){
   res.json({type:'GET'});
});*/

module.exports = router;