var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  console.log("connected");
  if (err) throw err;
  displayItems()
  sellItem();
});
  // --------------------------------------------------------------
function displayItems(){
  connection.query("SELECT * FROM products", function(err, res){
  if (err) throw err;
  console.log("======================================================");
  console.log("======================================================");
  console.log("Welcome! I've got a little bit of everything. Take a look around.");
  console.log("======================================================");
  console.log("======================================================");
  for (var i = 0; i < res.length; i++) {
    console.log("Item #: " + [res[i].item_id ,
                " Product: " + res[i].product_name ,
                " Department: " + res[i].department_name ,
                " Price: "  + "$" + res[i].price ,
                " Quantity: " + res[i].stock_quantity]);
 console.log("------------------------------------------------------");
        }
  });

}

var sellItem = function() {
inquirer.prompt({
  name:"item_id",
  type:"list",
  message: "Which item would you to buy?",
  choices: ["Bread", "Apple", "Banana", "Pizza", "Gordon Ramsay Gourmet Burger", "Delorean", "Ducati Monster",
  "Diamond Ring", "Gold Chain", "Flame Thrower"]
}).then(function(answer) {
  console.log(answer);
})
}
