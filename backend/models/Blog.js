const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    desc:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments"
    }]
},{timestamp: true})

const PostModel = mongoose.model("Posts",PostSchema)

module.exports = PostModel; 