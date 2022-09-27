var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const Admin = require('../schemas/Administrator');
const Post = require('./Posts');
const User = require('./Users');

//Delete a specific post with id
router.delete('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({_id: id}, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json(
                    {"message": "post not found"});
        }
        res.json(post);
    });
});

//Get a specific post with an id
router.get('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(req.params.id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).send(
                    {"message": "post not found"});
        }
        res.send(post);
        console.log(post);
    });
});

//Deleta a specific user
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

  //Delete a specfic user
router.get("/users/:id", function (req, res, next) {
    User.findOne({ _id: req.params.id })
      .populate("posts")
      .populate("reviews")
      .exec(function (err, user) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(user);
      });
      
  });