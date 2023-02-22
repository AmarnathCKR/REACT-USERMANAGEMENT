const express = require("express");
const router = express.Router();
const { User } = require("../database/userModel");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT, { expiresIn: "1d" });
};

router.post("/auth", async(req,res)=>{
  const admin = {
    email : "adminMail@gmail.com",
    password : "adminPassword"
  }

  if(req.body.email === admin.email && req.body.password === admin.password){
    const token = createToken(admin.email);
    const user = await User.find({})
    res.json({data : token, allUser : user})
  }else{
    res.status(500).send({message : "Invalid credentials"})
  }
});

router.post("/delete", async(req,res)=> {
  await User.findByIdAndDelete(req.body.key)
  const user = await User.find({})
  res.json({data : user})
})

router.post("/user-edit", async(req,res)=> {
  await User.updateOne({_id : req.body.id}, { $set: { name: req.body.name } })
  const user = await User.find({})
  res.json({data : user})
})




module.exports = router;