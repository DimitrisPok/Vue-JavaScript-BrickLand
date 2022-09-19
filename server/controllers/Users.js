var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const User = require("../schemas/User");
const Post = require("../schemas/Post");


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

// post post(s) with user ID 
router.post("/users/:id/posts", function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.status(500);
    }
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    var post = new Post(req.body);
    post.save(function (err) {
      if (err) {
        return res.status(500);
      }
      console.log("Post " + post.caption + " was created.");
    });
    user.posts.push(post);
    user.save();
    console.log("Post " + post.caption + " was added to ", user.name);
    return res.status(201).json(user);
  });
});


// get the user's posts.
router.get("/users/:id/posts", function (req, res, next) {
  User.findOne({ _id: req.params.id })
    .populate({
      path: "posts",
      model: "post",
      populate: {
        path: "users",
        model: "user",
      },
    })
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(user.posts);
      return res.status(200).send(user.posts);
    });
});


//get user's reviews with id - 
/*router.get('/users/:id/:reviews', function(req, res, next) {
  User.findOne({ _id: req.params.id })
    .populate("reviews")
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(user.reviews);
      return res.status(200).send(user.reviews);
    });
});*/


// GET /cars/:car_id/drivers/:driver_id (relationship) - THIS IS ALSO WORKING BUT EMPTY 
router.get("/users/:user_id/posts/:post_id", function (req, res, next) {
  /*var id = req.params.user_id;
  User.findById(id).populate({
    path: "post", 
    model:"posts", 
    match: {_
      post_id: req.params.post_id
    },
    })
    .exec(function(err, user){
    if(err) {return res.status(500).send(err);}
    if(User == null){
     return res.status(404).json({"message":"User not found"});
    }
    res.status(200).json(user.posts);
  });

});*/
//findOne({ _id: req.params.user_id })

  var id = req.params.user_id;
  User.findById(id).populate({path: 'post', match: {_id:req.params.post_id} }).exec(function (err, user) {
    if (err) {
        return next(err);
    }
    if (err) {
      return res.status(404).json({"message": "User is not found"});
    }
  console.log(user.posts);
  return res.status(200).json(user.posts);
  });


  /*User.findOne({ _id: req.params.user_id })
    .populate("posts", {
      match: { _id: { $ne: req.params.post_id } },
    })
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      //console.log(user.posts);
      return res.status(200).json(user.posts);
    });*/
});




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

//DELETE TASK 3 LAST - deletes in post but does not delete from user 
router.delete("/users/:user_id/posts/:post_id", function (req, res, next) {
  Post.findOneAndDelete({ _id: req.params.post_id }, function(err, post) {
    if (err) { return res.status(500).send(err); }
    if (post == null) {
        return res.status(404).json(

                  {"message": "Post not found"});
    }
  }
  );

  User.findByIdAndUpdate(
    { _id: req.params.user_id },{ $pull: { posts: { _id: req.params.post_id } } }, function (err, user) {
        if (err) {
          return res.status(500).send(err);
        }
        if (user == null) {
          return res.status(404).json(
          {"message": "User not found"});
        }console.log("hello")
        res.status(200).send(user);}
  );
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