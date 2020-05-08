
/*
  Jmporting all the dependencies
*/
const express = require('express');
const dotenv = require('dotenv');
const home = require('./controllers/home');
const login = require('./controllers/login');
const signup = require('./controllers/signup');

const app = express(); // start using express;
dotenv.config();
/*
  Making controllers ready
*/
home(app);
login(app);
signup(app);

/*
  Setting our app server
*/
app.set('view engine','ejs'); // setting view enigne
app.use(express.static('./assets')); // using static resources for the views
app.listen(5000 , ()=>console.log('App started at port 5000')); // setting the port number
