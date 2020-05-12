const bodyParser = require('body-parser');
const signup = require('../dao/signup');

const urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = (app)=>{

  // post request for signup
  app.post('/signup',urlEncodedParser,async (req,res)=>{

    let data = JSON.parse(JSON.stringify(req.body));

    let status = await signup(data);
    console.log(status);
    
    res.json({result:status});
  });// {app.post}


}; //{module.exports}
