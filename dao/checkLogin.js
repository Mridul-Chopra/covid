var mysql = require('mysql');

 var resultData ;


async function checkLogin(userData)
{
  let conn = await getConnection();
  let data = await runLoginQuery(conn , userData);
  //  console.log(data);
  return data;
}

// function to get connection
function getConnection()
{
  return new Promise((resolve,reject)=>{
    let conn = mysql.createConnection({
      host: "localhost",
      user:"root",
      password:"123",
      database:"covid"

    });//{conn}

      conn.connect((err)=>{
        if(err){
          reject(); // reject the promise
          throw err ;
        } // throw the error
        else{
          resolve(conn);
        }

      }); //{connect}
  });//{promise}
}

// to run the query
function runLoginQuery(conn , userData)
{
  return new Promise((resolve,reject)=>{ // gives a promise

      let sql = "Select * from users where email = ? and password = ?";  // query to check login
      conn.query(sql, [userData.email ,  userData.password] ,(err,result)=>{
        if(err)
        {
          reject(); // reject the promise
          throw err;
        } // throw the error

        let queryResult  = JSON.stringify(result[0]); // data after query the database
        let userData = JSON.parse(queryResult.split(' ')[0]); // actual user data after parsing the queryResult

        //resultData = userData; // setting the result data
        resolve(userData); // resolving the promise

      }); //{query}

  }); //{promise}
} // {runLoginQuery}



module.exports = {
  checkLogin:checkLogin
}
