const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended:false});
const chatReader = require('../dao/chatReader');



module.exports = (app)=>{
    app.get('/getLatestChat',urlEncodedParser,async (req,res)=>{

        try{
            let data =  await chatReader.getLatestChat(); // getting data from the dao layer
            res.json(data); // sending data as response
        }
       catch(err){
        console.error(err); // logging the error 
        res.json(err); // sending error as json response
       }

    });

    // get the chat data in a specified range
    app.get('/getRangedChat', urlEncodedParser, async(req,res)=>{
        
        let start = parseInt(req.query.start); // getting start from query parameter
        let end = parseInt(req.query.end); // getting end from query parameter

        try{
            let data = await chatReader.getChatInRange(start,end); // getting data from dao layer
            res.json(data); // sending data as json response    
        }
        catch(err){
            console.log(err); // logging the error 
            res.json(err); //  sending error as json response
        }
    });  //{getRangedData}
} // {module.exports}