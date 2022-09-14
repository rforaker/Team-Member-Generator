const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

function startApp() {
    addEmployee();
}

function addEmployee() {
    inquirer.prompt([{
        message: "Enter employees name",
        name: "name"
    },
    {
        type: "list",
        message: "Select employees role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter employees id",
        name: "id"
    },
    {
        message: "Enter employees email address",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter employee's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more employees?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreEmployees"
        }])
        .then(function({roleInfo, moreEmployees}) {
            let newEmployee;
            if (role === "Engineer") {
              newEmployee = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
              newEmployee = new Intern(name, id, email, roleInfo);
            } else {
              newEmployee = new Manager(name, id, email, roleInfo);
            }
            employees.push(newEmployee);
            addHtml(newEmployee)
            .then(function() {
                if (moreEmployees === "yes") {
                    addEmployee();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

startApp();