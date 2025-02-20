const express = require('express');
const { Getalldata,GetUsers, Userdelete } = require('../controllers/Dashboard.js');
const { isAdmin } = require('../middleware/isAdmin.js');
const UserModel = require('../models/user.js');

 const DashboardRoutes = express.Router()

 DashboardRoutes.get('/',isAdmin,Getalldata)
 DashboardRoutes.get('/users',isAdmin,GetUsers)
 DashboardRoutes.delete('/deleteuser/:id',isAdmin,Userdelete)
module.exports = DashboardRoutes;