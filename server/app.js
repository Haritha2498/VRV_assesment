const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");


const User = require("./models/User")
const UserPermission = require("./models/Permission")

const bcrypt = require("bcrypt");



app.use(
  cors({ 
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose.connect("mongodb://localhost:27017/vrv");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});





app.post("/register", async (req, res) => {
  try {
    const { userName, password, email, userType } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    if (userType === "admin") {
      const existingAdmin = await User.findOne({ userType: "admin" });
      if (existingAdmin) {
        console.log("ghjk")
        return res.status(402).json({ error: "An admin account already exists. Only one admin is allowed." });
      }
    }
    
    const newUser = new User({
      username: userName,
      password: password,
      email,
      userType
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    console.log(userName, password);
    const user = await User.findOne({ username: userName });
    console.log(user, "user");
    var passwordMatch=0;
    if (!user) {
      return res.status(401).json({ error: "Authentication failed - User doesn't exist" });
    }
    if (password===user.password){
        passwordMatch=1;
    }
    else{
        passwordMatch=0;
    }
    if (passwordMatch===0) {
      return res.status(401).json({ error: "Authentication failed - Password doesn't match" });
    }
    if (user.userType === "admin") {
      return res.status(200).json({ message: "Admin login successful", userType: "admin" });
    } else {
      return res.status(201).json({ message: "User login successful", userType: "user" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/adduser", async  (req,res) =>{

    try {
    // const data = req.body;
    const { name, password, email, role } = req.body;
    const data={ name, password, email, role };
    console.log(data)
    // const result = await User.create(data);

        const newUser = new User({
      username: name,
      password: password,
      email,
      userType:role
    });

    await newUser.save();

    console.log("user created")
    res.status(201).json({ message:"user added"});
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
})



app.get("/users", async (req, res) => {
    console.log("userdetails");
  const details = await User.find({});
  res.json(details);
});

app.put("/edituser/:name", async (req, res) => {
  const username = req.params.name;
  console.log(username)
  const data = req.body;
  try{
  const details = await User.findOneAndUpdate(
    {username: username },
  req.body,
{ new: true, runValidators: true }
);
  console.log(details)
  
  res.status(200).send("User updated successfully");

  }
  catch (error) {
    res.status(500).send("Server error");
  }
});



app.get("/userdetails/:name", async (req, res) => {
  const username = req.params.name;
  console.log(username)
  const details = await User.findOne({username: username });
  console.log(details)
  res.json(details);
});

app.delete('/deleteuser/:name',async(req,res)=>
    {
    try{
      const username = req.params.name;
      console.log(username)
      const deleteuser=await User.findOneAndDelete({username:username})
      console.log("user deleted")
        res.status(200).send("user deleted successful");
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ error: 'Failed to send message' });
    }
  })


app.post("/addpermissions/:name", async (req, res) => {
  const username = req.params.name;
  const {permissions } = req.body;
  console.log(username);
  console.log(permissions)
  
  const enabledPermissions = Object.keys(permissions).filter(
    (key) => permissions[key] === true
  );

  if (!username || !permissions ||typeof permissions !== "object") {
    return res.status(400).json({ message: "Name and permissions are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await UserPermission.findOne({ username });

    if (existingUser) {
      // Update permissions of the existing user
      const updatedUser = await UserPermission.findOneAndUpdate(
        { username },
        { $set: { permissions:enabledPermissions } }, // Overwrite existing permissions with new ones
        { new: true } // Return the updated document
      );
      return res.status(200).json({
        message: "Permissions updated successfully.",
        user: updatedUser,
      });
    } else {
      // Create a new user document
      const newUser = new UserPermission({ username, permissions:enabledPermissions });
      await newUser.save();
      return res.status(201).json({
        message: "User created successfully.",
        user: newUser,
      });
    }
  } catch (error) {
    console.error("Error updating/creating user permissions:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

app.get("/getuserspermissions", async (req, res) => {
    console.log("userdetails");
  const details = await UserPermission.find({});
  res.json(details);
});

