const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts",
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        require:true
    },
    comment:{
        type:String,
        require:true
    },
},{
    timestamps: true
})

const CommentModel = mongoose.model('comments',commentSchema)

module.exports = { CommentModel };