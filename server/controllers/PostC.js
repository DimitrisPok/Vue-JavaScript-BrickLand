var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const Post = require('../schemas/Post');


//post posts
router.post('/posts', function(req,res, next){
    var post = new Post(req.body);
    post.save(function(err){
        if (err){return res.status(500).send(err);}
    res.status(201).json({"post": post});
    });
});

//get all the posts
router.get('/posts',function(req, res){
    Post.find(function(err, posts) {
         if (err){return res.status(500).send(err);}
    res.status(201).json({"post": posts});
    });
});

//getting an post with a specific id
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

//put method for posts
router.put('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({"message": "post not found"});
        }
        post.caption = req.body.caption;
        post.instructions = req.body.instructions;
        post.save();
        res.json(post);
    });
});

//deleting post
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

//to update certain attributes of a user 
router.patch('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({"message": "user not found"});
        }
        post.name = req.body.name || post.name;
        post.password = req.body.password || post.password;
        post.email = req.body.email || user.email;
        post.save();
        res.json(post);
    });
  });

  //delete an entire collection
router.delete('/posts', function(req, res, next) {
    Post.deleteMany(function(err, posts) {
        if (err) { return next(err); }
        if (posts == null) {
            return res.status(404).json(
                    {"message": "There are no posts!"});
        }
        res.status(201).json({"post": posts});
    });
  });

module.exports = router;