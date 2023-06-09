var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var PostSchema = new Schema(
    {

        caption : {
            type: String
        },

        instructions : {
            type: String
        },

        img: {
            type: String 
        },

        user: { 
            type: Schema.Types.ObjectId, 
            ref: "user" 
        },

        review: [{ 
            type: Schema.Types.ObjectId, 
            ref: "review" 
        }],
        
    
    },

    { timestamps : true },
);

const Post = mongoose.model('post', PostSchema);
module.exports = Post;



