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
function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("======================================================");
    console.log("======================================================");
    console.log("Welcome! I've got a little bit of everything. Take a look around.");
    console.log("======================================================");
    console.log("======================================================");
    for (var i = 0; i < res.length; i++) {
      console.log("Item #: " + [res[i].item_id,
        " Product: " + res[i].product_name,
        " Department: " + res[i].department_name,
        " Price: " + "$" + res[i].price,
        " Quantity: " + res[i].stock_quantity
      ]);
      console.log("------------------------------------------------------");
    }
  });
}

var sellItem = function() {
    connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          inquirer.prompt([{
            name: "item_id",
            type: "list",
            message: "Which item would you to buy?",
            choices: ["Bread", "Apple", "Banana", "Pizza", "Gordon Ramsay Gourmet Burger", "Delorean", "Ducati Monster",
              "Diamond Ring", "Gold Chain", "Flame Thrower"
            ]
          }, {
            name: "stock_quantity",
            type: "input",
            message: "How much do you need?",
            validate: function(value) {
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          }]).then(function(answer) {

              connection.query("SELECT * FROM products", function(err, res) {
                  if (err) throw err;
                  var selectedItem;
                  for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.item_id) {
                      selectedItem = res[i];
                      // console.log(res);
                      console.log(answer.item_id);
                    }
                  }
                  if (selectedItem.answer > parseInt(answer.stock_quantity)) {
                    connection.query("UPDATE products SET? WHERE?", [{
                          stock_quantity: (selectedItem.stock_quantity - parseInt(answer.stock_quantity))
                        },
                        {
                          item_id: selectedItem.item_id
                        }
                      ],
                      function(err) {
                        if (err) throw err;
                        sellItem();
                      })
                    }
                    else {
                      console.log("Sorry... We're out!")
                      console.log(res[i]);
                      console.log(selectedItem);
                      // sellItem();
                    }
                  });
              });
          });
        }
