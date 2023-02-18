const router = require("express").Router();
const { User } = require("../database/userModel")
const Joi =  require("joi")
const bcrypt =  require("bcrypt")

router.post("/user-data", async (req,res) => {
    console.log(req.body)
    const user = await User.findOne({email : req.body.userEmail})
    if(user){
        res.status(200).send({data : user, message: "Data fetched"})
    }
    
})

router.post("/", async (req,res)=> {
    try{
        const {error} = validate(req.body)
        if(error){
            return res.status(400).send({message : error.details[0].message})
        }
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(401).send({message : "Invalid Email or Password"})
        }
        const validPassword = await bcrypt.compare(
            req.body.password,user.password 
        )
        if(!validPassword){
            return res.status(401).send({message : "Invalid Email or Password"})
        }
        const token = user.generateAuthToken()
        res.status(200).send({data : {token: token,email : user.email}, message: "Login Successful"})
    }catch(error){
        res.status(500).send({message: "internal server error"})
    }
})

const validate = (data) => {
 const schema = Joi.object({
    email : Joi.string().email().label("Email"),
    password : Joi.string().label("Password")
 })
 return schema.validate(data)
}

module.exports = router