var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdministratorSchema = new Schema(
    {

        adminName : {
            type: String, 
            required:[true,'Name is required']
        },

        password : {
            type: String, 
            required:[true, 'Password is required']
        },

        email : {
            type: String, 
            required:[true, 'Email is required']
        },

        entryDate: {
            type:Date, 
            default:Date.now
        }
    }
);

const admin = mongoose.model('admins', AdministratorSchema);
module.exports = admin;


