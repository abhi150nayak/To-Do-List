

const mongoose = require('mongoose')
const express = require("express");
const bcrypt = require('bcrypt')
const cors = require("cors");

require("dotenv").config();

require("./connection");

const User = require("./models/User");


const app = express();
app.use(cors());
const PORT = 4000;

app.use(express.json());
app.use(cors());



app.post('/register', async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill in all fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ error: "Please try a different email" });
    } else if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    } else {
      const user = new User({ name, email, password, cpassword });
      await user.save();
      res.status(200).json({ message: "Successfully registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});


      
app.post('/signIn', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please fill all fields" });
    return;
  }
  try {
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (isMatch) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
                                                     