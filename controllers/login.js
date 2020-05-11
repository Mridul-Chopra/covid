const bodyParser = require('body-parser');
const chat = require('../dao/chat');
const login = require('../dao/checkLogin');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = (app)=>{

  const SECRET_KEY = process.env.SECRET_KEY; // getting the secret key from environment variables

  // handling the post mapping and use the middleware verify token
  app.post('/chat' ,urlEncodedParser ,verifyToken, (req,res)=>{

  let data = JSON.parse(JSON.stringify(req.body));// getting all the data
  let message = data.message
  console.log(message);

    // verify token by jwt
    jwt.verify(req.token,SECRET_KEY,(err,authData)=>{

      if(err){
        console.log(err);
        res.sendStatus(403); // set the forbidden error code
      } // {if}
       else {
         res.json('You are logged in');

         let jwtPayload = jwtDecode(req.token); // decoding the payload from jwt
         let email = jwtPayload.user; // getting user's email from the payload

         chat.saveChat(message,email); // saving the chat to mongo db

       } // {else}
    }); // {verify}

  });// {app.post}

  //handling post request for login
  app.post('/login', urlEncodedParser, (req,res)=>{

    let loginUser = JSON.parse(JSON.stringify(req.body)); // details given by the user
    let user = login.checkLogin(loginUser);

    console.log(user);

    // check user details
    if(user.email === loginUser.email & user.password===loginUser.password){

      let email = loginUser.email;
      console.log('Login success for user : ' + user.username);
      // signing the jwt token to send to client
      jwt.sign({email:email},SECRET_KEY,(err,token)=>{
        res.json({
          token
        }); // {res.json}
      }); // {jwt.sign}
    } // {if}
    else{
      res.json('You have entered incorrect details');
    }
  }); // {app.post}

  /*
    function to verify token
    req : http request
    res : http response
    next : next middleware
  */
  function verifyToken(req,res,next){

    let data = JSON.parse(JSON.stringify(req.body));// getting all the data

    // get authorization header value
    let bearerHeader = data.authorization;

    if(typeof bearerHeader != 'undefined'){
      // split at space
      let bearer =  bearerHeader.split(' ');
      // get the token
      let bearerToken = bearer[1];
      req.token = bearerToken;
      // call next middleware
      next();
    } // {if}
    else{
      res.sendStatus(403);
    } // {else}

  } // {verifyToken}

};// {module.exports}
