

/*
  making it importable
*/
module.exports = (app)=>{

      // handle the get request
      app.get('/', (req, res)=>{
        res.render('index'); // render the view
      }); // {get}

      
}; // {module.exports}
