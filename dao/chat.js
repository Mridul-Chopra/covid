const mongoUtils = require('../utils/mongo-models');


function saveChat(message , name , email){
  
  let chat = mongoUtils.getChat();
  let chatToSave = new chat({chat:message, user:name , email:email, time:Date.now()}); // data to be saved

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
