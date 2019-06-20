"use strict";

const PORT          = 8080;
const express       = require("express");
const app           = express();

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
      <html>
      <head>
        <title>Title of the document</title>
      </head>
      
      <body>
        The content of the document......
      </body>
    
    </html> 
  `);
})

const server = app.listen(process.env.PORT || PORT, () => {

  console.log("Example app listening on port " + (process.env.PORT || PORT));

});