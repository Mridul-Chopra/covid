const mongo = require('mongoose');

function saveChat(message , name , email){

  const url = 'mongodb://localhost:27017/Covid'; // url to connect to mongo db
  mongo.connect(url); // connecting to mongo

// defining the schema for documents
  const chatSchema = new mongo.Schema({
    chat : String ,
    user : String,
    email:String
  });

  var chat = mongo.model('Chat',chatSchema); // making model out of required schema

  let chatToSave = new chat({chat:message, user:name , email:'email'}); // data to be saved

  // saving the data in mongo db
  chatToSave.save((err,data)=>{
    if(err) throw err;
    console.log('Chat saved');
  }); //{save}
} //{saveChat}


// modules to be exported
module.exports ={
  saveChat: saveChat
}
