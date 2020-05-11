var mysql = require('mysql');

 var resultData ;


async function checkLogin(userData)
{
  let conn = getConnection();
  await runLoginQuery(conn , userData);
  console.log(resultData);
  return resultData;

}

// function to get connection
function getConnection()
{
    let conn = mysql.createConnection({
      host: "localhost",
      user:"root",
      password:"123",
      database:"covid"
    }); //{conn}
    return conn; // returning the connection object
}

// to run the query
function runLoginQuery(conn , userData)
{
  return new Promise((resolve,reject)=>{ // gives a promise
    conn.connect((err)=>{
      if(err)
      {
        reject(); // reject the promise
        throw err ;
      } // throw the error

      let sql = "Select * from users where email = ? and password = ?";  // query to check login
      conn.query(sql, [userData.email ,  userData.password] ,(err,result)=>{
        if(err)
        {
          reject(); // reject the promise
          throw err;
        } // throw the error

        let queryResult  = JSON.stringify(result[0]); // data after query the database
        let userData = JSON.parse(queryResult.split(' ')[0]); // actual user data after parsing the queryResult

        resultData = userData; // setting the result data
        resolve(); // resolving the promise

      }); //{query}
    }); // {connect}
  }); //{promise}
} // {runLoginQuery}



module.exports = {
  checkLogin:checkLogin
}
