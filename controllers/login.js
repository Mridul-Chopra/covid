const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
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
       } // {else}
    }); // {verify}

  });// {app.post}

  //handling post request for login
  app.post('/login', urlEncodedParser, (req,res)=>{
    let user = {username:'Mridul', password:'123'};  // dummy user
    let loginUser = JSON.parse(JSON.stringify(req.body)); // details given by the user

    // check user details
    if(user.username === loginUser.username & user.password===loginUser.password){
      console.log('Login success for user : ' + user.username);
      // signing the jwt token to send to client
      jwt.sign({loginUser},SECRET_KEY,(err,token)=>{
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
