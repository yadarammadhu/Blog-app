const express = require('express');
const dotenv = require('dotenv');
const DBCon = require('./utlies/db.js');
const AuthRoutes = require('./routes/Auth.js');
const cookieParser = require('cookie-parser');
const BlogsRoutes = require('./routes/Blog.js');
const DashboardRoutes = require('./routes/Dashboard.js');
const { CommentsRoutes } = require('./routes/Comments.js');
const  PublicRoutes = require('./routes/Public.js');
const cors = require('cors')
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',  // Correct       // Allows all origins (or specify an array/string)
  credentials: true   // Allow credentials (cookies, auth headers, etc.)
};
app.use(express.json());

// MongoDB connection
DBCon();
app.use(express.static('public'))
app.use(cookieParser());
app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
 
app.use('/auth', AuthRoutes);
app.use('/blog', BlogsRoutes); 
app.use('/dashboard',DashboardRoutes);
app.use('/comment',CommentsRoutes)
app.use('/public',PublicRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
