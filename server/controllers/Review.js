var express = require("express");
var app = express();
const router = express.Router();
const Review = require('../schemas/Review');
var mongoose = require('mongoose');
const review = require("../schemas/Review");



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
        res.send(review);
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
        review.comment = req.body.comment;
        review.like = req.body.like;
        review.save();
        res.json(review);
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
        res.json(review);
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
        review.like = req.body.like || review.like;
        review.save();
        res.json(review);
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
  




module.exports = router;