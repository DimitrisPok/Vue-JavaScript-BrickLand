var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var PostSchema = new Schema(
    {
        postId : {
            type: Number
        },

        caption : {
            type: String,
            
        },

        instructions : {
            type: String,
          
        },

        entryDate: {type:Date, default:Date.now}

    }
);

const Post = mongoose.model('post', PostSchema);
module.exports = Post;


