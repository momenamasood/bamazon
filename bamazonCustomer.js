var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "BamazonDB"
});

connection.connect(function (err) {
    if (err) {
        console.log("Error in database connection");
    }
    console.log("connected as id " + connection.threadId);
    start();
});

function start(){

  console.log("Items for Sale");
    //prints the items for sale and their details
    connection.query('SELECT * FROM Products', function(err, res){
      if(err) throw err;
    
      console.log('Welcome to Bamazon')

      var table = new Table({
        head: ['ID', 'Product Name','Department Name','Price','Quantity']
    });
     
    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    
      for(var i = 0; i<res.length;i++){
        var peoductArr = [];
        for(var key in res[i]){
          peoductArr.push(res[i][key])
        }
        table.push(peoductArr);
      }
      console.log(table.toString());
      //function to place order after displaying items
      placeOrder();
    });
}

//Function to place orders
function placeOrder() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Please enter the ID of an item:"
    },

    {
        name: "quantity",
        type: "input",
        message: "How many units of the product you would like to buy?"
    }])
          .then(function (answer) {
            //SQL query to find quantity and price from Products table for the item user want to buy
              var temp = "SELECT StockQuantity,Price FROM Products WHERE ?";
              var id = parseInt(answer.id);
              connection.query(temp, { ItemID: id }, function (err, data) {
                  //console.log(data[0].price);
                  if (err) {
                      console.log(err);
                  }


                   //check if we have enough product to sell 
                  if (data[0].StockQuantity >= parseInt(answer.quantity)) {
                      //Query for Update quantity
                      var q = data[0].StockQuantity - parseInt(answer.quantity);
                      console.log(id);
                      //if we do, update the quantity in database
                      connection.query("UPDATE Products SET ? WHERE ?", [{ StockQuantity: q }, { ItemID: id }], function (err, q_data) {
                          if (err) {
                              return console.log(err);
                          }
                          console.log("Quantity updated");
                          //count the price and display the price onto the screen
                          var p = data[0].Price * parseInt(answer.quantity);
                          console.log("Total price: " + p);
                      });

                  }
                  //if we don't have sufficient quantity give an error message to the user
                  else {
                      console.log("Insufficient Quantity!");
                  }
                  connection.end();
              });
          });
}
    