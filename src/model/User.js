import mongoose from "mongoose";
const UserSchemas= new mongoose.Schema({

    firstName: {
    type:String,
    required:true
    },
    lastName: {
        type:String,
        required:true
    },

    email: {
        type:String,
        required:true,
        unique:true
    },

    password: {

        type:String,
        required:true
    },
    confirmpassword:{
        type:String,

    
    },
    role:{

        type:String,
        enum:["user","admin"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

const User=mongoose.model("User",UserSchemas)
export default User