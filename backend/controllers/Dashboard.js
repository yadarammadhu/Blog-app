const PostModel = require("../models/Blog.js");
const UserModel = require("../models/user.js");
const fs = require('fs')
const path = require('path')
const Getalldata = async (req, res) => {
    try {
        const Users = await UserModel.find();
        const Posts = await PostModel.find();
        const Comments = await PostModel.find();
        if (!Users.length && !Posts.length) {
            return res.status(404).json({ success: false, message: "No Data Found" });
        }

        return res.status(200).json({ success: true, Users, Posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const GetUsers=async(req,res)=>{
    try {
        const Users = await UserModel.find();
        if (!Users) {
            res.status(404).json({success:false,message:"No Data Found"})
        }
   res.status(200).json({success:true,Users})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
const Userdelete = async(req,res) =>{
    try {
        const userId = req.params.id
        const ExistUser = await UserModel.findById(userId)
        if (!ExistUser) {
            res.status(404).json({success:false,message:"No User Found"})
        }
        if (ExistUser.role == 'admin') {
            return res.status(404).json({success:false,message:"Soory Your Admin You Can't Delete You Account"})
             
         }
         if(ExistUser.profile){
                     const profilepath = path.join(__dirname, '../public/images', ExistUser.profile);
                     fs.promises.unlink(profilepath)
                     .then(()=> console.log('user image is deleted'))
                     .catch(error => console.log('Error in deleteing user image',error))
                 }
         const DeleteUser = await UserModel.findByIdAndDelete(userId)
         res.status(200).json({success:true,meassange:"User Deleted Successfully",user:DeleteUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
module.exports = { Getalldata,GetUsers,Userdelete };
