const PostModel = require("../models/Blog.js"); // ✅ Import the model
const { post } = require("../routes/Auth.js");
const fs = require('fs')
const path = require('path')
const Create = async (req, res) => {
    try {
        const { title, desc } = req.body;

        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        const imagePath = req.file.filename; // ✅ Get image filename from multer
        console.log("Uploaded Image:", imagePath); // Debugging log

        const CreateBlog = new PostModel({
            title,
            desc,
            image: imagePath // ✅ Now correctly defined
        });

        await CreateBlog.save();
        return res.status(200).json({ success: true, message: "Post created successfully", post: CreateBlog });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const deletePost= async(req,res)=>{
    try {
        const postId=req.params.id

        const FindPost = await PostModel.findById(postId)
        if(!FindPost){
            return res.status(404).json({ success: false, message: "Post not Found" });
        }
        if(FindPost.image){
            const profilepath = path.join(__dirname, '../public/images', FindPost.image);
            fs.promises.unlink(profilepath)
            .then(()=> console.log('Post image is deleted'))
            .catch(error => console.log('Error in deleteing post image',error))
        }
        const deletedPost = await PostModel.findByIdAndDelete(postId)
        return res.status(200).json({ success: true, message: "Post Deleted Successfully",post:deletedPost });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const getposts = async(req,res)=>{
    try {
        const posts = await PostModel.find();
        if (!posts) {
            return res.status(404).json({ success: false, message: "Post not Found" })
        }
        return res.status(200).json({ success: true,posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const update = async(req,res)=>{
    try {
        const {title,desc} = req.body
        const postId = req.params.id;

        const postUpdate = await PostModel.findById(postId)
        if (!postUpdate) {
            return res.status(404).json({ success: false, message: "Post not Found" })
        }
        if(title){
            postUpdate.title=title
        }
        if (desc) {
            postUpdate.desc= desc
        }
        if(req.file){
            postUpdate.image=req.file.filename
        }
        await postUpdate.save()
        return res.status(200).json({ success: true, message: "Post Updated Successfully",post:postUpdate });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
module.exports = { Create, deletePost, getposts, update};
