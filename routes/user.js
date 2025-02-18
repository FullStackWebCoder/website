const routes = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

routes.get("/",async(req,res)=>{
    const result = await User.find()  
    res.send(result);
})

routes.put("/:id/:password",async(req,res)=>{
    const valid = await User.findById(req.params.id);
   if(valid!=null){
        if(bcrypt.compare(req.params.password,valid.password)){
            const result = await User.updateOne({_id:req.params.id},{$set:req.body})
        }
   }else{
         res.send("Invalid User")
   }
    // const result = await User.updateOne({
    //     _id:req.params.id},{$set:req.body})
    res.send({result:"Update"})
})


 module.exports = routes