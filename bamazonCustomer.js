var mysql = require("mysql");
var inquirer = require("inquirer");
const chalkAnimation = require('chalk-animation');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MyNewPass",
    database: "bamazon"
  });
connection.connect(function(err) {
    if (err) throw err;
  });

console.log("INITIALIZE");
initializeAnimation() ;



function initializeAnimation() {
let str = 'NOW LOADING';
const rainbow = chalkAnimation.rainbow(str);
 
// Add a new dot every second
setInterval(() => {
    rainbow.replace(str += '.');
}, 1000);

}
let str = 'NOW LOADING';
const rainbow = chalkAnimation.rainbow(str);
 
// Add a new dot every second
setInterval(() => {
    rainbow.replace(str += '.');
}, 1000);