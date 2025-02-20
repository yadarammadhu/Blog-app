const express = require('express');
const { AddComment } = require('../controllers/Comment.js');
const { isLogin } = require('../middleware/isAdmin.js');
const CommentsRoutes = express.Router()


CommentsRoutes.post('/addcomment',isLogin,AddComment)
module.exports = { CommentsRoutes };