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
var upload = multer({storage:storageMulti});



    
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
    var newPost = new Post({
        caption: req.body.caption,
        instructions: req.body.instructions,
        img: req.body.img
           // data:  req.file.path, req.file.originalname,  // req.file.filename,fs.readFileSync('images/'), only the posting with postman works with this one req.file.filename), req.files yo can post with both but images are not being saved, req.file.originalname works with postman
            // contentType: 'multipart/form-data',    //"multipart/form-data"
            
    });
    newPost.save()
    .then(() => res.send('successfully uploaded')).catch(err=>console.log(err))
    console.log(newPost.img)
});


//Get the images
router.get('/posts/:id/assets', function(req,res,next) {
    Post.findById( req.params.id, function(err,post) {
        if (err) return next(err);
        console.log(post.file)
        console.log(post.path)
        res.render("posts.ejs", {post: file.path});
        // res.contentType(post.img.contentType);
        // res.send(user.img.data);
    });
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
        res.send(post);
        console.log(post);
    });
});
//get all the posts

router.get('/posts/:posts_id/reviews',function(req, res){
    var id = req.params.posts_id;
    Post.findById(id).populate("review").exec(function(err,post){
        if (err) {return res.status(500).send(err);}
    if (post == null) {
        return res.status(404).json({"message": "Post not found"});
    }
    res.status(200).send(post);
    })
});
//get the reviews of the individual post
router.get('/posts/:id/reviews', async (req, res) => {
    try {
        var id = req.params._id;
        const posts = await Post.findById(id).populate('review')
        // The Post documents returned should have their owner subdocument populated
        res.status(201).send(posts)
    } catch (e) {
        console.log(e)
    }
})


// get the reviews of the post

router.get('/posts/:posts_id/reviews',function(req, res){
    var id = req.params.posts_id;
    Post.findById(id).populate("reviews").exec(function(err,post){
        if (err) {return res.status(500).send(err);}
    if (post == null) {
        return res.status(404).json({"message": "Post not found"});
    }
    res.status(200).send(post.reviews);
    })
});


//getting an post with a specific id


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
  /*
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
  */

//filtering using caption

router.get("/posts?caption=:house", function (req, res, next) {
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







//trying to get the reviews to show up on the posts
router.get("/posts/:id/test", function (req, res, next) {
    Post.findOne({ _id: req.params.id })
      .populate({
        path: "posts",
        model: "post",
        populate: {
            path: "reviews",
            model: "review",
        },
      })
      .exec(function (err, post) {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(post.reviews);
        return res.status(200).send(post.reviews);
        
      });
      
  });
  
  router.get("/posts/:id", function (req, res, next) {
    Post.findOne({ _id: req.params.id })
      .populate("review")
      .exec(function (err, post) {
        if (err) {
          return res.status(500).send(err);
        }
        console.log("hello");
        return res.status(200).send(post);
        
      });
      
  });

  


//.......................testing querys out
/*
router.get('/posts/query', (req, res, next ) => {
    const query = req.query 
   const sorting= Post.find(function(err, posts) {
        if (err){return res.status(500).send(err);}
   const sorted = sorting.sort({posts});
     res.json(sorted)
   });
    
});


router.get('posts/sorted',  async (req, res)=> {
    const result =  Post.find({}).sort({
    caption: 1,
});
res.json(result);
})

router.get('posts/', function(req, res){
    const sorted = Post.find({Post}).sort({
        createdAt : 1,
    });
res.send(sorted);
});


router.get('/posts/sort',function(req, res){
    const postSort = Post.find(function(err, posts) {
       const sortedPost = postSort.sort({caption : 1});
         if (err){return res.status(500).send(err);}
    res.status(201).json({sortedPost});
   
    });
});
*/

//..................................

//post posts
/*
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
*/

module.exports = router;