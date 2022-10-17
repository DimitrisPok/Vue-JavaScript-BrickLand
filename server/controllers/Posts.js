var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const Post = require('../schemas/Post');
const fs = require('fs');
const path = require('path');
app.use("/static", express.static('images'))
require('dotenv/config'); 


var multer = require('multer');
const { Router } = require('express');
var storageMulti = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, "./images");
  },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ '--' + file.originalname)
  } 
});
var upload = multer({storage:storageMulti});


//post posts
router.post('/posts', upload.single('img'), function(req,res, next){
    var newPost = new Post({
        caption: req.body.caption,
        instructions: req.body.instructions,
        img: req.body.img           
    });
    newPost.save()
    .then(() => res.send('successfully uploaded')).catch(err=>console.log(err))
    console.log(newPost.img)
});



//get all the posts
router.get('/posts',function(req, res){
    Post.find(function(err, posts) {
         if (err){return res.status(500).send(err);}
    res.status(201).json({"post": posts});
    });
});


router.get('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(req.params.id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).send(
                    {"message": "post not found"});
        }
        res.json(post, id);
        console.log(post);
    });
});

// so this code here apperently works now, desite not working last time I tested it out

router.get('/posts/:posts_id/reviews',function(req, res){
    var id = req.params.posts_id;
    Post.findById(id).populate("review").exec(function(err,post){
        if (err) {return res.status(500).send(err);}
    if (post == null) {
        return res.status(404).json({"message": "Post not found"});
    }
    res.status(200).json(post, id);
    })
});

//put method for posts
router.put('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({"message": "Post not found"});
        }
        const newPost = {
        caption: req.body.caption,  
        instructions : req.body.instructions,
        img : req.body.img
        }       
      Post.findOneAndReplace({_id: id}, newPost, {option: true}, function(err, post) {
        if(err) {return res.status(500).send(err);}
        if(post = null) {
          return res.status(404).json({"message" : "Post not found"});
        }
        res.status(200).json(newPost, id);
      });
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
        res.json(post, id);
    });
});

//to update certain attributes of a post
router.patch('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({"message": "post not found"});
        }
        post.postId = req.body.postId || post.postId;
        post.caption = req.body.caption || post.caption;
        post.instructions = req.body.instructions || post.instructions;
        post.save();
        res.json(post, id);
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

//Functions that allows u to search on a specific post
router.get('/posts/search/:key', async (req, res) =>{
    var data = await Post.find(
        {
           "$or" : [
                {caption:{$regex: req.params.key}}
            ]
        }
    )
    res.send(data);
});



module.exports = router;