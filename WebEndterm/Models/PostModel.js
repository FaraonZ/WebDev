import mongoose

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {
            type:String,
            required:true
        },
        text: {
            type:String,
            required:true
        },
        dateOfCreation: { 
            type: Date, 
            default: Date.now 
        },
        author: {
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports= mongoose.model("Posts", PostSchema);