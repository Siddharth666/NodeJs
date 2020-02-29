var fs = require('fs')
var mysqlconn = require('../mySqlConnection');
const fastcsv = require("fast-csv");

const dd = Date();

const ws = fs.createWriteStream("Assets/ExcelGenerated/_mysql_fastcsv_.csv");


module.exports.excel = (req, res)=> {

    mysqlconn.query("SELECT name, email, password FROM users", function(error, data, fields) {
      //  console.log(data);
      //  console.log(dd);
      if (error) throw error;
  
      const jsonData = JSON.parse(JSON.stringify(data));
     // console.log("jsonData", jsonData);
  
      fastcsv
        .write(jsonData, { headers: true })
        .on("finish",function() {
          console.log("successfully!");
        })
        .pipe(ws);
    });
}



//SOURCE
//https://bezkoder.com/node-js-export-mysql-csv-file/