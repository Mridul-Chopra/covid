const mongo = require('mongoose');

const url = 'mongodb://localhost:27017/Covid'; // url to connect to mongo db
mongo.connect(url); // connecting to mongo

// defining the schema for documents
const chatSchema = new mongo.Schema({
    chat : String ,
    user : String,
    email:String,
    time:Number
});

var chat = mongo.model('Chat',chatSchema); // making model out of required schema

// getter function to get the chat schema
function getChat()
{
    return chat;
}    

module.exports = {
    getChat:getChat
}