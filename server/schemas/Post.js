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
            type: String, 
            Default: "there are no instructions available"
        },

        img:
        {
            type: String
        },

        user: { 
            type: Schema.Types.ObjectId, 
            ref: "users" 
        },

        review: [{ 
            type: Schema.Types.ObjectId, 
            ref: "reviews" 
        }],
        
        legoPieces : [{
        category : {type: String },

        subCategory : {type: String},

        elementId : {type: Number},

        DesignId : {type: Number}
        }]
    
    },

    { timestamps : true },
);

const Post = mongoose.model('post', PostSchema);
module.exports = Post;



