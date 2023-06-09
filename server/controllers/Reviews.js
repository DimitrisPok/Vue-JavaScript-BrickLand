var express = require("express");
var app = express();
const router = express.Router();
const Review = require('../schemas/Review');
var mongoose = require('mongoose');
const review = require("../schemas/Review");
const Post = require("../schemas/Post");

const toId = mongoose.Types.ObjectId



//get all reviews
router.get('/reviews',function(req, res){
    Review.find(function(err, reviews) {
         if (err){return res.status(500).send(err);}
    res.status(201).json({"review": reviews});
    });
});

// create a review
router.post('/reviews', function(req,res, next){
    var review = new Review(req.body);
    review.save(function(err){
        if (err){return res.status(500).send(err);}
    res.status(201).json({"review": review});
    });
});

//get review with id
router.get('/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).send(
                    {"message": "Review not found"});
        }
        res.json(review, id);
        console.log(review);
    });
});

//to update an entire review 
router.put('/reviews/:id', function(req, res, next) {
  var id = req.params.id;
  Review.findById(id, function(err, review) {
      if (err) { return next(err); }
      if (review == null) {
          return res.status(404).json({"message": "Review not found"});
      }
      const newReview = {
      comment: req.body.comment,  
      }       
    Review.findOneAndReplace({_id: id}, newReview, {option: true}, function(err, review) {
      if(err) {return res.status(500).send(err);}
      if(review = null) {
        return res.status(404).json({"message" : "Review not found"});
      }
      res.status(200).json(newReview, id);
    });
  });
});

// to delete a review 
router.delete('/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findOneAndDelete({_id: id}, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                    {"message": "Review not found"});
        }
        res.json(review, id);
    });
});

//to update certain attributes of a review 
router.patch('/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json({"message": "review not found"});
        }
        review.comment = req.body.comment || review.comment;
        review.save();
        res.json(review, id);
    });
});

//delete an entire collection
router.delete('/reviews', function(req, res, next) {
    Review.deleteMany(function(err, reviews) {
        if (err) { return next(err); }
        if (reviews == null) {
            return res.status(404).json(
                    {"message": "There are no reviews!"});
        }
        res.status(201).json({"review": reviews});
    });
});


// post reviews(s) with post ID 
router.post("/posts/:id/reviews", function (req, res, next) {
    var id = req.params.id
    Post.findById(id, function (err, post) {
      if (err) {
        return res.status(500);
      }
      if (post == null) {
        return res.status(404).json({ message: "Post does not exist" });
      }
      var newReview = new Review(req.body);
      newReview.save(function (err) {
        if (err) {
          return res.status(500);
        }
        console.log("Review was successfully created."); 
        console.log(newReview)
        post.review.push(newReview);
        post.save();
        console.log("Review was added to ", post.caption);
        return res.status(201).json(post, id);
      });
      
    });
});


// get all reviews from a post.
router.get("/posts/:id/reviews", function (req, res, next) {
    Review.findOne({ _id: req.params.id })
      .populate({
        path: "reviews",
        model: "review",
        populate: {
          path: "posts",
          model: "post",
        },
      })
      .exec(function (err, post) {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(post.reviews);
        return res.status(200).json(post.reviews, req.params.id);
      });
});

module.exports = router;