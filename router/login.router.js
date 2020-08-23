const express= require('express');
const router =express.Router();
const validate=require('../models/login.model');
const login= require('../models/login.model.js');
const _=require('lodash');
const bcrypt=require('bcrypt');
const config=require('config')
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth.middleware');
const log=require('../middleware/log.middleware')
router.get('/', (req, res)=>{
    login.find((err, result)=>{
        if(err)
        res.status(404).send(err)
        else
        res.status(200).send(result);
    })
})
router.get('/:id', (req, res)=>{
    login.findById({_id:req.params.id},(err, result)=>{
        if(err)
        res.status(404).send(err)
        else
        res.status(200).send(result);
    })
})
router.delete('/:id',(req,res)=>{
    login.findByIdAndDelete({_id:req.params.id},(err,result)=>{
    if(err) console.log(err);
    else res.status(200).send(result);
    console.log("login Account has been deleted")
   })
 })
//  router.post('/',async(req,res)=>{
//     const { error} = validate(req.body)
//     if(error) 
//        return res.status(400).send(error.details[0].message);
//         let newTask=new Admin({
//         username:req.body.username,
//         password:req.body.password
//         });
//         newTask.save((err,result)=>{
//             if(err) console.log(err);
//             else res.status(200).send(result);
//         })
//   })

router.post('/', async(req,res)=>{
    const{error}=validate(req.body)
    if(error)
    return res.status(404).send(error.details[0].message);
    let user=await login.findOne({email:req.body.email});
    if(user)
    return res.status(400).send("User already exists");
    let newlogin= new login(_.pick(req.body,['username','email', 'password']))

    const salt=await bcrypt.gensalt(10);
    newlogin.password=await bcrypt.hash(newlogin.password, salt);
    await newlogin.save();
    const token=jwt.sign({_id:newlogin._id,email:newlogin.email}, config.get('jwtprivatekey'));
    res.header('x-auth-token', token).status(200).send(_.pick(newlogin, ['name','email']))
})
router.put('/:id', (req, res)=>{
    login.findByIdAndUpdate({_id:req.params.id}, {$set:{
        username:req.body.username,
        password:req.body.password

    }}, 
    (err, result)=>{
        if(err)
        res.status(404).send(err)
        else
        res.status(200).send(result);
    })
})
module.exports=router
