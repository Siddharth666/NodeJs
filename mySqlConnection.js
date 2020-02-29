var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'sql@2019',
    database: 'hybrid'
});
connection.connect(function (err) {
    if (!err) {
        console.log("My SQL Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

module.exports = connection; 