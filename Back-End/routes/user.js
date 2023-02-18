const express = require("express");
const router = express.Router();
const {User, validate} = require("../database/userModel")
const bcrypt = require("bcrypt")

router.post("/", async (req,res)=>{
    try{
        console.log()
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message : error.details[0].message})
        }
        const user = await User.findOne({ email : req.body.email})
        if(user){
            return res.status(409).send({ message: "User already registered"})
        }

        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        await new User({...req.body, password : hashPassword}).save();
        res.status(201).send({message: "User Created Successfuly"})
    }catch(error){
        res.status(500).send({message : "internal server error"})
    }
});

router.post("/update-image",async (req,res) => {
    try{
        const user = await User.findOne({email : req.body.userEmail})
        if(user){
           const date =req.body.image
            await User.updateOne({email : req.body.userEmail},{$set :{image : date}})
            const updatedData = await User.findOne({email : req.body.userEmail})
            res.status(201).send({data : updatedData , message: "Image Updated"})
        }else{
            res.status(500).send({message : "internal server error"})
        }
        
    }catch(error){
        console.log(error)
    }
})



module.exports = router;