var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
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

module.exports = mongoose.model("ratings", RatingSchema);