var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
    {
        //postId : {
           // type: Number
        //},

        comment : {
            type: String,
            default: "no comment"
        },
        
        user: { 
            type: Schema.Types.ObjectId, 
            ref: "user" 
        },

        post: { 
            type: Schema.Types.ObjectId, 
            ref: "post" 
        }

        /*user: { 
            type: Schema.Types.ObjectId, 
            ref: "users" 
        },

        post: {
            type: Schema.Types.ObjectId, 
            ref: "posts"
        }*/
    },
    { timestamps : true },


);

const review = mongoose.model('review', ReviewSchema);
module.exports = review;

// you need 'reviews'