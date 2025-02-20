const express = require('express');
const { GetSinglepost } = require('../controllers/public.js');

const PublicRoutes = express.Router();

PublicRoutes.get('/singlepost/:id', GetSinglepost);

module.exports = PublicRoutes; // ✅ Correct export
