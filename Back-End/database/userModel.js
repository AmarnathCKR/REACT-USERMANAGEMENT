const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    status : {type: String, default : true},
    password : {type : String},
    image : {type: String,
    }
})

userSchema.methods.generateAuthToken =function (){
    const token = jwt.sign({_id : this.id}, process.env.JWT, {expiresIn : "7d"})
    return token
} 

const User = mongoose.model("User", userSchema)

const validate = (data) => {
    const schema = Joi.object({
        name : Joi.string().label("Name"),
        email : Joi.string().label("Email"),
        status : Joi.boolean().label("Status"),
        password : passwordComplexity().label("Password")
    })
    return schema.validate(data)
}

module.exports = {User, validate}