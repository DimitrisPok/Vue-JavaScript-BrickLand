var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var PostSchema = new Schema(
    {
       // postId : {
           // type: Number
       // },

        caption : {
            type: String
        },

        instructions : {
            type: String
        },

        img:
        {
            type: String
        },

        user: { 
            type: Schema.Types.ObjectId, 
            ref: "users" 
        },

        review: { 
            type: Schema.Types.ObjectId, 
            ref: "reviews" 
        }
    
    },

    { timestamps : true },
);

const Post = mongoose.model('post', PostSchema);
module.exports = Post;



