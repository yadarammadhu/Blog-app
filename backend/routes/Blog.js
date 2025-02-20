const express = require('express');
const { Create, deletePost, getposts, update } = require('../controllers/Blog.js');
const { isAdmin } = require('../middleware/isAdmin.js');
const upload = require('../middleware/Multer.js');
const { GetSinglepost } = require('../controllers/Public.js');   // ✅ Import existing multer configuration

const BlogsRoutes = express.Router();
BlogsRoutes.post('/create', isAdmin, upload.single('image'), Create); // ✅ Ensure field name matches frontend
BlogsRoutes.delete('/delete/:id',isAdmin,deletePost)
BlogsRoutes.get('/getposts',getposts)
BlogsRoutes.patch('/update/:id',isAdmin, upload.single('image'),update)
BlogsRoutes.get('/singlepost/:id', GetSinglepost);
module.exports = BlogsRoutes;
