var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RatingSchema = new Schema(
    {
        postId : {
            type: Number
        },

        comment : {
            type:String
        },

        like : {
            type:Boolean,
            default: false
        }
    }
);
