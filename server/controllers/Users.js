var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const User = require("../schemas/User");
const Post = require("../schemas/Post");
const Posts = require('./Posts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


//get all users
router.get('/users',function(req, res){
  User.find(function(err, users) {
       if (err){return res.status(500).send(err);}
  res.status(201).json({"users": users});
  });
});


// post user
router.post('/signup', async (req,res, next) => {
  
  const registeredUser = await User.findOne({email: req.body.email}, function(err, regUser){
    if(err){res.status(500).send(err)}
    if(regUser){
      return res.status(409).json({
        title : 'error',
        error: 'email in use'
      })
    }
    console.log(regUser)
  })

  if(!registeredUser){
  const newUser = new User({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
  })
  newUser.save(err => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.status(200).json({
      title: 'signup success'
    })
  })
  return console.log(newUser);
}}
);

router.post('/login', (req,res, next) => {
  console.log(req.body)
  User.findOne({
    email: req.body.email
  },
  (err,user) => {
    if (err) return res.status(500).json({
      title: 'server error',
      error: err
    })
    if (!user) {
      return res.status(401).json({ 
       title: 'user not found',
       error: 'invalid credentials' 
      });
    }
    // incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'login failed',
        error: 'invalid credentials'
      })
    }
    // if all is good, create a token and send to frontend
    let token = jwt.sign({ userId: user._id}, 'secretkey123456789');
    return res.status(200).json ({
      title: 'login succes',
      token: token
    })
  })
})

// grabbing user info 
router.get('/user', (req, res, next) => {
  let token = req.headers.token // token
  jwt.verify(token, 'secretkey123456789', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'unauthorized'
    })
    // token is valid 
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          name: user.name,
          email: user.email
        }
      })
    })
  })
})


  if(!registeredUser){
  const newUser = new User({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
  })
  newUser.save(err => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.status(200).json({
      title: 'signup success'
    })
  })
  return console.log(newUser);
};
// post post(s) with user ID - AND IT FKN WORKSSSSS

//adding dependencies for image upload
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
    storage:storageMulti})
//..............................
router.post("/users/:id/posts/image", upload.single('img'), function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.status(500);
    }
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    var post = new Post(req.body);
    if(req.file){
      post.img = req.file.path
  }
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


// get the user's posts.
router.get("/users/:id/posts/test", function (req, res) {
  User.findOne({ _id: req.params.id })
    .populate({
      path: "posts",
      model: "post",
      populate: {
        path: "users",
        model: "users",
      },
    })
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send(err);
      } 
      if (user == null){
        return res.status(404).json(
          {"message": "There are no posts to this user!"});
      }
      //console.log(user.posts);
      return res.status(200).send(user.posts);
    });
});


// Added this methods to try out to see if it works
router.get("/users/:user_id/posts/:post_id", function (req, res, next) {
  User.findOne({ _id: req.params.user_id })
    .populate({ path: "posts", model: "post", 
      match: { _id: { _id : req.params.post_id } },
    })
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(user.posts);
      return res.status(200).send(user.posts);
    });
});

 /*
<<<<<<< HEAD
// doesnt work properly, confirm later and take it away 
=======
// doesnt work properly, confirm later and take it away
>>>>>>> bc9608e217ccfc3bdb4f555dec0b3fa11d57b126
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

});
//findOne({ _id: req.params.user_id })

  var id = req.params.user_id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
     User.findById(id).populate({path: 'post', match: {_id: req.params.post_id} }).exec(function (err, user) {
    if (err) {
        return next(err);
    }
    if (err) {
      return res.status(404).json({"message": "User is not found"});
    }
  console.log(user.posts);
  return res.status(200).json(user.posts);
  });
  }
 


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
    });
});


//This mehtod show an error where the post is null
router.get('/users/:user_id/posts/:post_id', function(req, res){
  var id = req.params.user_id;
  Post.findById(id).populate({path: 'post', match: {_id: req.params.post_id} }).exec(function(err, user){
  if (err) {return res.status(500).send(err);}
  if (Post == null) {
      return res.status(404).json({"message": "Post not found"});
  }
  console.log(user.posts);
  res.status(200).json(user.posts);
  })
});
*/ 

router.get("/users/:id", function (req, res, next) {
  User.findOne({ _id: req.params.id })
    .populate("posts")
    .populate("reviews")
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(user);
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





//Trying to get the reviews to show up when getting all the users posts for a certain id
router.get("/users/:id/posts", function (req, res) {
  User.findOne({ _id: req.params.id })
    .populate("posts")
    .populate('reviews')
    .exec(function (err, user) {
      if (err) {
        return res.status(500).send(err);
      } 
      if (user == null){
        return res.status(404).json(
          {"message": "There are no posts to this user!"});
      }
      //console.log(user.posts);
  
      return res.status(200).send(user.posts);
    });
});

module.exports = router;