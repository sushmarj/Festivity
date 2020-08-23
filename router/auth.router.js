const {login} = require('../models/login.model.js');
const express = require('express');
const router =express.Router();
const _=require('lodash');
const bcrypt=require('bcrypt');
const joi=require('joi');
const jwt=require('jsonwebtoken');
router.post('/',async(req, res)=>{
    const{error}=Validate(req.body);
    if(error)
    return res.status(404).send(error.details[0].message);
    const user=await login.findone({email:req.body.email})
    if(!user)
    return res.status(400).send("Invalid email id or Password");
    const validPassword=await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)
    return res.status(400).send("Invalid email id or password");

    const token=jwt.sign({_id:user._id, email:user.password}, 'sushma');
    res.send(token);
 })
    function Validate(user){
        const schema={
            email:joi.string().min(5).max(255).required().email(),
            password:joi.string().min(5).max(1024).required()
        };
        return joi.validate(user, schema);
    }


module.exports=router;