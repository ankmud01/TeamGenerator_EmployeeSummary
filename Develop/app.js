const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArr = [];
const managerArr = [];
const engineerArr = [];
const internArr = [];

function init() {

  //TODO - Welcome to Teambuilder App
  console.log("Please answer following question to build team");

  function createTeam(){
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'createTeam',
        message: "Do you want to create a team?"
      }
    ]).then(answer =>{
      console.log("User wants to create a new team? " + answer.createTeam);
      if(answer.createTeam === true){
        //TODO
      return chooseRole();
      }else{
        console.log ("Thank You for using TeamGenerator!!!")
      }
    })
  };

  function chooseRole() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'chooseRole',
        message: 'Which type of team member would you like to add?',
        choices: ["Manager", "Engineer", "Intern", "I don't want to add any roles"]
      }
    ]).then(result => {
      const selectedrole = result.chooseRole
      switch(selectedrole){
        case ("Manager"):
          //TODO - check if we alreaady have manager if not then create manager
          createManager();
          break;
        case("Engineer"):
          createEngineer();
          break;
        case("Intern"):
          createIntern();
          break;
        default:
          console.log ("Thank You for using TeamGenerator!!!");
      }
      //Will need to make this await till user answers other questions
      //addMoreEmloyees(); 
    })
  }

  async function createManager() {
    console.log("We are creating a manager!!")
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the managers name?'
        // validate: function(value){
        //   const pass = value.match(/^[a-zA-Z ]{2,30}+$/i);
        //   if (pass) {
        //     return true;
        //   }else{
        //     return 'Please enter a valid name';
        //   }
        // }
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the managers id?',
        validate: function (value) {
          const pass = value.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          } else {
            return 'Please enter a positive number greater than zero.';
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the managers email-id?',
        validate: function (value) {
          const pass = value.match(/\S+@\S+\.\S+$/i);
          if (pass) {
            return true;
          }
          return 'Please enter a valid email address';
        }
        
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the managers office number?',
        validate: function (value) {
          const pass = value.match(/^[0-9]$/);
          if (pass) {
            return true;
          }
          return 'Please enter a valid number';
        }
      }
    ]).then(function (result){
      const { name, id, email, officeNumber } = result
      const managerUser = new Manager(name, id, email, officeNumber)
      managerArr.push(managerUser);
      console.log(managerArr);
    })
  };

  function createEngineer(){
    inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the engineers name?'
          // validate: function (value) {
          //   var pass = value.match(
          //     /^[a-zA-Z ]{2,30}+$/i
          //   );
          //   if (pass) {
          //     return true;
          //   }
          //   return 'Please enter a valid name';
          // }
        },
        {
          type: 'input',
          name: 'id',
          message: 'What is the engineers id?',
          validate: function (value) {
            var pass = value.match(/^[a-z0-9]+$/i);
            if (pass) {
              return true;
            }else{
              return 'Please enter a valid id';
            }
          }
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is the engineers email-id?',
          validate: function (value) {
            var pass = value.match(/\S+@\S+\.\S+$/i);
            if (pass) {
              return true;
            }else{
              return 'Please enter a valid email address';
            }
          }
        },
        {
          type: 'input',
          name: 'github',
          message: 'What is the engineers Github Username.',
          validate: function (value) {
            let pass = value.match(/^[0-9A-Za-z\s\-]+$/i);
            if (pass) {
              return true;
            }else{
              return 'Please enter a valid github username';
            }
          }
        }
    ]).then(function (result){
      const{name,id,email,github} = result
      const engineerUser = new Engineer(name, id, email, github)
      engineerArr.push(engineerUser);
      console.log(engineerArr);
    })
  };

  function createIntern(){
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the interns name?',
        validate: function (value) {
          var pass = value.match(/^[a-zA-Z ]{2,30}+$/i);
          if (pass) {
            return true;
          }else{
            return 'Please enter a valid name';
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the interns id?',
        validate: function (value) {
          var pass = value.match(/^[a-z0-9]+$/i);
          if (pass) {
            return true;
          }else{
            return 'Please enter a valid id';
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the interns email-id?',
        validate: function (value) {
          var pass = value.match(/\S+@\S+\.\S+$/i);
          if (pass) {
            return true;
          }else{
            return 'Please enter a valid email address';
          }
        }
      },
      {
        type: 'input',
        name: 'school',
        message: 'What is the interns school name?',
        validate: function (value) {
          var pass = value.match(/^[a-zA-Z ]{2,30}+$/i);
          if (pass) {
            return true;
          }else{
            return 'Please enter a valid school name';
          }
        }
      }
    ]).then(function(result){
      const{name,id,email,school} = result
      const internUser = new Intern(name, id, email, school)
      internArr.push(internUser);
      console.log(internArr);
    })
  };

  async function addMoreEmloyees(){
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'addTeamMember',
        message: "Do you want to add another a team member?"
      }
    ]).then((answer) => {
      console.log("User wants to add new team member? " + answer.addTeamMember);
      if(answer.addTeamMember === true){
        buildteam();
      }else{
        console.log ("Thank You for using TeamGenerator!!!")
      }
    })
  }

  // async function buildteam() {
  //   const role = await chooseRole()
  //     .then((role) => {
  //       console.log("So the user wants to create a - " + role);
  //       if (role === "Manager") {
  //         //TODO
  //         return createManager();
  //       }
  //       else if (role === "Engineer") {
  //         //TODO
  //         return createEngineer();
  //       }
  //       else if (role === "Intern") {
  //         //TODO
  //         return createIntern();
  //       }
  //       else {
  //         return console.log("Thank You for using TeamGenerator!!!")
  //       }
  //       //Will need to make this await till user answers other questions
  //       //addMoreEmloyees(); 
  //     })
  // }


  createTeam();
};
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
