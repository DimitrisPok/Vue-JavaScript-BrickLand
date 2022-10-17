var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name : {
            type: String, 
            required:[true,'Name is required']
        },

        password : {
            type: String, 
            required:[true, 'Password is required']
        },

        email : {
            type: String, 
            required:[true, 'Email is required'],
            unique: true
        },

        entryDate: {
            type:Date, 
            default:Date.now
        },

        posts: [{ 
            type: Schema.Types.ObjectId,
            ref: 'post', 
        }],

        reviews: [{ 
            type: Schema.Types.ObjectId,
            ref: 'review', 
        }],
        
    },
    
);

const user = mongoose.model('users', UserSchema);
module.exports = user;