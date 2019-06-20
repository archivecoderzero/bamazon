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
        message: "Please select user",
        choices: ["CUSTOMER VIEW", "MANAGER VIEW", "SUPERVISOR VIEW"]
      })
      .then(function(answer) {
        if (answer.view === "CUSTOMER VIEW") {
         console.log("CUSTOMER VIEW test");
         customerView();
        }
        else if(answer.view === "MANAGER VIEW") {
            console.log("MANAGER VIEW test")
            managerView();

        } else{
            console.log("SUPERVISOR VIEW test")
            supervisorView();

        }
      });


      
      
      function customerView(){
      
      
        connection.query('SELECT * FROM products', function(err, results){
          if (err) throw err;
          console.log("WELCOME TO bAMAZON!");
          console.log("add");

      
          for (var i = 0; i < results.length; i++) {
            console.log("Product ID :" + results[i].item_id + "\t Item Name :" + results[i].product_name + "\t | PRICE :$" + results[i].price + "\tQUANTITY AVAILABLE : " + results[i].stock_quantity); 
          }
              inquirer.prompt([{
                type: 'input',
                name: 'item_id',
                message: "Select an ID of the item you want to buy"
      
              }]).then(function(answer){
                var item_id = parseInt(answer.item_id)
      
      
                for (var i = 0; i < results.length; i++) {
                  if(results[i].item_id == answer.item_id){
                    var result = results[i]; 
                    console.log('Total available : ' + result.stock_quantity + ' ' +result.product_name + '. For $' + result.price);
      
                    inquirer.prompt([{
                      type: 'input',
                      name: 'itemQuantity',
                      message: 'How many ' + result.product_name + ' would you like to buy?'
      
                    }]).then(function(answer){
                      var quantity = parseInt(answer.itemQuantity);
                      
                      if(quantity > result.stock_quantity){
                        console.log("Sorry , we dont have enough of in stock of " +  result.product_name);
                        inquirer.prompt([{
                          type: 'confirm',
                          name: 'shop',
                          message: "is there anything else we can do for you?"
      
                        }]).then(function(answer){
                          if(answer.shop){
                            customerView();
                          }else{
                            console.log("Thank you! Come againe")
                            connection.end();
                          }
                        })
      
                      }else{
                        console.log("Your Total : ");
      
                        connection.query('UPDATE Products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [quantity, item_id], function(err, results){
                          if (err) throw err;
                        });
      
                        var cost = result.price;
                        var totalCost = cost * quantity;
                        var total = totalCost;
                    
      
                        
                        console.log("QUANTITY ORDERED: " + quantity + " " +result.product_name + '  at ' + "$" + cost);
                        console.log("PRICE:  $" + total);
                        console.log("Your Total : " + total + "thank you for your purchase");
      
                        inquirer.prompt([{
                          type: 'confirm',
                          name: 'shop',
                          message: "Buy something again?"
      
                        }]).then(function(answer){
                          if(answer.shop){
                            customerView();
                          }else{
                            console.log("Thank you! Come again!")
                            process.exit();
                          }
                        })
                        
                      }
                    })
                  }
                }
              })
            
        });

      }


      function managerView(){



      }











  }
  

    


  