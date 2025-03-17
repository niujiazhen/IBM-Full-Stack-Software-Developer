const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  const email = req.params.email;
  let filtered_users=users.filter(user=>user.email===email);
  res.send(filtered_users);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Push a new user object into the users array based on query parameters from the request
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });
  // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users=users.slice().filter(user=>user.email===email);

  if(filtered_users.length>0){
    let user=filtered_users[0];
    let DOB = req.query.DOB;
    if(DOB){
      user.DOB=DOB;
    }

    let firstName = req.query.firstName;
    if(firstName){
      user.firstName=firstName;
    }

    let lastName = req.query.lastName;
    if(lastName){
      user.lastName=lastName;
    }

    users=users.filter(user=>user.email!==email);
    users.push(user);
    // Send a success message as the response
    res.send("The user with email: "+email+" has been updated");
  }
  else{
    // Send a failure message as the response
    res.send("The user with email: "+email+" not found");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`);
});

// GET request: Retrieve users by last name
router.get("/lastName/:lastName", (req, res) => {
  // Extract the lastName parameter from the request URL
  const lastName = req.params.lastName;
  // Filter the users array to find users whose lastName matches the extracted lastName parameter
  let filtered_lastname = users.filter((user) => user.lastName === lastName);
  // Send the filtered_lastname array as the response to the client
  res.send(filtered_lastname);
});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
  // Sort the users array by DOB in ascending order
  let sorted_users = users.sort(function(a, b) {
      let d1 = getDateFromString(a.DOB);
      let d2 = getDateFromString(b.DOB);
      return d1 - d2;
  });
  // Send the sorted_users array as the response to the client
  console.log(sorted_users);
  res.send(sorted_users);
});


module.exports=router;
