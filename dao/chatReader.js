const mongoUtils = require('../utils/mongo-models');


function getLatestChat(){

  return new Promise((resolve,reject)=>{
    
    let chat = mongoUtils.getChat(); // getting chat schema from mongo utils  

    chat.findOne({}).sort('-time').exec((err,data)=>{
      if(err){
        reject(err);
        throw err;
      }
      else{
        resolve(data);
      }
    });  

  }); // {Promise}
}

function getChatInRange(start , end){

  return new Promise((resolve ,reject)=>{

    if(start<=0){
      reject('Start value must be greater than 0');
    }
    if(start>end){
      reject('Start must be less than end');
    }

    let chat =  mongoUtils.getChat(); // get the chat schema
    
    let total = end - start +1 ; // total number of records to be found
    
    chat.find({}).sort('time').skip(start-1).limit(total).exec((err,data)=>{
      if(err){
        reject(err); // reject if there is error
        throw err; // throw the error
      }
      else{
        resolve(data); // resolve the data
      }
    });// {exec}

  }); // {Promise}
} //{getChat}


module.exports ={
    getLatestChat:getLatestChat,
    getChatInRange:getChatInRange
}