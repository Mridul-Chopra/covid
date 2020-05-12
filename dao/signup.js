var mysql = require('mysql');

module.exports =   async (data)=>{

  let conn = await getConnection();
  let status = await signUpQuery(conn,data);
  return status;

  } // {signupUser}


  function getConnection()
  {
    return new Promise((resolve,reject)=>{
      let conn = mysql.createConnection({
        host: "localhost",
        user:"root",
        password:"123",
        database:"covid"
      }); //{conn}
      
      conn.connect((err)=>{
        if(err) throw err;
      });

      resolve(conn);
    });
  }

  function signUpQuery(conn , data)
  {
    return new Promise((resolve,reject)=>{
      
      let status =  "Sign up Successful";
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
      resolve(status);

      });
    });
  }