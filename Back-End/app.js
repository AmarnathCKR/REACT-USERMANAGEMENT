require('./database/db')
const express = require("express");
const app = express();
const path=require('path');
const user = require("./routes/user");
const admin = require("./routes/admin")
const auth = require("./routes/auth");
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin:["http://localhost:3001"],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true
    }
    ))

app.use("/api/users", user);
app.use("/api/auth",auth);
app.use("/api/admin",admin)

require("dotenv").config();
const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server: " + err);
    
  } else {
    console.log("Listening on http://localhost:3000");
  }
});