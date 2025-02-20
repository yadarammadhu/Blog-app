const PostModel = require("../models/Blog");
const { CommentModel } = require("../models/comments");


const AddComment = async(req,res)=>{
    try {
        const {postId,userId,comment} = req.body
        const newComment = new CommentModel({
            postId,userId,comment
        })
        await newComment.save()

        const existpost = await PostModel.findById(postId)
        if(!existpost){
            return res.status(404).json({ success: false, message: "Blog post not found" });
        }
        existpost.comments.push(newComment._id)
        await existpost.save()
        res.status(200).json({ success: true, message: "Comment Added Successfully",comment: newComment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { AddComment };