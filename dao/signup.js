var mysql = require('mysql');

module.exports = function signupUser(data){

  let status =  "Sign up Successful";

  let conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"123",
    database:"covid"
  }); //{conn}

  conn.connect((err)=>{
    if(err) throw err;

     let sql = "Insert into users (email , full_name , password ) values ? ";
     var values = [ [data.email , data.fullName , data.password] ];

    conn.query(sql,[values],(err)=>{
      if(err){
        if(err.code === 'ER_DUP_ENTRY' ){
          status =  "Email already in use. Please try with another one";
        }
        else{
          console.log(err);
        }// else
     } //{if(err)}

      conn.end();
      return status;

    }); // {conn.query}
  }); // {conn.connect}

  } // {signupUser}
