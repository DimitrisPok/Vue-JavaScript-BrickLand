var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const Post = require('../schemas/Post');



//testing out importing imgane...........................................

var multer = require('multer');
const { Router } = require('express');
var storageMulti = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ '--' + file.originalname)
    } 
}
);
var upload = multer({
    storage:storageMulti});

router.post("/single", upload.single('img'), async (req,res)=>
{
    var post = new Post(req.body);

    post.save(function(err){
        if(req.file){
            post.img = req.file.path
        }
        if (err){return res.status(500).send(err);}
    res.status(201).json({"post": post});
    console.log(req.file)
    });
    
});

//.............................................








//post posts
router.post('/posts', upload.single('img'), function(req,res, next){
    var post = new Post(req.body);
     if(req.file){
            post.img = req.file.path
        }
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
            return res.status(404).json({"message": "post not found"});
        }
        post.postId = req.body.postId || post.postId;
        post.caption = req.body.caption || post.caption;
        post.instructions = req.body.instructions || post.instructions;
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

//filtering using caption

router.get("/api/posts?caption=:house", function (req, res, next) {
    console.log("finding");
    Post.find({ caption: { $all: [req.params.caption] } }).exec(function (
      err,
      post
    ) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("success");
      return res.status(200).json(post);
    });
});

module.exports = router;