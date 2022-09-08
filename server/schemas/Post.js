var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        postId : {type: Number},

        caption : {type: String},

        instructions : {type: String}

    }
);
