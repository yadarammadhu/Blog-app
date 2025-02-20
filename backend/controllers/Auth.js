const express = require('express');
const UserModel = require('../models/user'); 
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Register=async(req,res)=>{
    try{
        const {FullName,email,password}=req.body

        const exitUser = await UserModel.findOne({email})
        if(exitUser){
            return res.status(303).json({success:false,message:"User Already exists please Login"})
        }
        const imagePath = req.file.filename
        const hashpassword = await bcryptjs.hash(password,10)
        const NewUser= new UserModel({
            FullName,email,password:hashpassword,profile:imagePath, role: "user"
        })
        await NewUser.save()
        return res.status(200).json({success:true,message:"User Registered Successfully",user:NewUser})
    } catch(error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

const Login = async(req,res)=>{
    try {
        const {email,password}=req.body
        if (!email || !password) {
            return res.status(400).json({success:false,message:"All Fields are required"})
        }
        const FindUser = await UserModel.findOne({email})
        if (!FindUser) {
            return res.status(400).json({success:false,message:"No user Found please register"})
        }
        const comparepassword = await bcryptjs.compare(password,FindUser.password)
        if (!comparepassword) {
            return res.status(400).json({success:false,message:"Invalid password"})
        }
        const token = jwt.sign({userId:FindUser._id,role: FindUser.role},process.env.JWT_SECREATE)
        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({success:true,message:"Login Successfully",user:FindUser,token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}
const Logout = async(req,res)=>{
    try {
        res.clearCookie('token')
        res.status(200).json({success:true,message:"Logout Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}
module.exports = { Register, Login, Logout };