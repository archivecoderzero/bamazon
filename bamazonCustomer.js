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
const neon = chalkAnimation.neon(str);
 
setInterval(() => {
    neon.replace(str += '.');
}, 100);

setTimeout(() => {
    neon.stop(); // Animation stops
}, 1000);


setTimeout(() => {

    // START THE FUNCTION HERE : 
    prompt();


    // START THE FUNCTION HERE : 


}, 2000); 


}


function prompt(){
    inquirer
      .prompt({
        name: "view",
        type: "list",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["CUSTOMER VIEW", "MANAGER VIEW", "SUPERVISOR VIEW"]
      })
      .then(function(answer) {
        if (answer.view === "CUSTOMER VIEW") {
         console.log("CUSTOMER VIEW test")
        }
        else if(answer.view === "MANAGER VIEW") {
            console.log("MANAGER VIEW test")
        } else{
            console.log("SUPERVISOR VIEW test")
        }
      });
  }
  

    


  