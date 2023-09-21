const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../UserDatabase.json");
function readDataFromFile() {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}
function writeDataToFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}
router.get("/test", (req, res) => {
  res.status(200).send({ message: "this is home page", path: dataFilePath });
});
router.get("/users", (req, res) => {
  const users = readDataFromFile();
  res.send(users);
});
router.get("/users/:id", (req, res) => {
  const users = readDataFromFile();
  const userId = req.params.id;
  const user = users.find((user) => user.id === parseInt(userId));
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      message: "User not Found",
    });
  }
});
router.post("/users", (req, res) => {
  const user = req.body;
  //  console.log('user',user);
  const users = readDataFromFile();
  user.id = new Date().getTime().toString();
  //  console.log('user',user)
  users.push(user);
  writeDataToFile(users);
  res.send(users);
});
router.put("/users/:id", (req, res) => {
  const users = readDataFromFile();
  const userId = req.params.id;
  const updatedUser = req.body;
  const userIndex = users.findIndex((user) => user.id == userId);
  if (userIndex == -1) {
    res.status(404).send({
      message: "User not Found",
    });
  }

  users[userIndex] = {
    
    ...users[userIndex],
    ...updatedUser,
  };
  writeDataToFile(users);
  res.send(users[userIndex]);
});
router.delete('/users/:id',(req,res)=>{
    const users=readDataFromFile()
    const userId=req.params.id;
    const userIndex=users.findIndex(user=>user.id==userId)
    if(userIndex == -1){
        res.status(404).send({
            message:"user not found"
        })
    }
    users.splice(userIndex,1);
    writeDataToFile(users);
    res.send({
        message:`user with id ${userId} has been deleted successfully`
    })

})

module.exports = router;
