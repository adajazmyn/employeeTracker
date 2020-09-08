var mysql = require("mysql");
var inquirer = require("inquirer");
const { type } = require("os");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeTrackerDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  });
  
  function start() {
    inquirer
      prompt({
        name: "viewDepartments",
        type: "list",
        message: "Would you like to [VIEW] a department, [UPDATE] a department, or [ADD] a department?",
        choices: ["VIEW", "UPDATE", "ADD", "EXIT"]
        })
        .then(function(answer){
        if (answer.viewDepartments === "VIEW") {
          viewDepartment();
        }
        else if(answer.viewDepartments === "UPDATE") {
          udpateDepartment();
        }
        else if(answer.viewDepartments === "ADD") {
          addDepartment();
        } else{
          connection.end();
        }
      
    })
      
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "What would you like your department name to be?"
        },
        {
          
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO dept SET ?",
          {dept_name: answer.dept},
          function(err) {
            if (err) throw err;
            console.log("Your department was created successfully!");

            start();
          }
        );
      });

  }

  function viewDepartment() {
    connection.query("SELECT * FROM dept", function(err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "departments",
            type: "rawlist",
            choices: function(){
              var choiceArray = [];
              for (var i = 0; i< results.length; i++) {
                choiceArray.push(results[i].dept_name);
              }
              return choiceArray;
            },
            message: "What department would you like to view?"
          },
          {
            name: "roles"
          },
        ])
    })
  }