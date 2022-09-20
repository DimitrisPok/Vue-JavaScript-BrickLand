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

        user: [{ 
            type: Schema.Types.ObjectId, 
            ref: "user" 
        }],

        review: [{ 
            type: Schema.Types.ObjectId, 
            ref: "review" 
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



