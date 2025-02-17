const routes = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

routes.get("/",(req,res)=>{
    res.send("User data")
})

routes.put("/:id/:password",async(req,res)=>{
    const valid = await User.findById(req.params.id);
   if(valid!=null){
        if(bcrypt.compare(req.params.password,valid.password)){
            const result = await User.updateOne({_id:req.params.id},{$set:req.body})
        }
   }
    const result = await User.updateOne({
        _id:req.params.id},{$set:req.body})
    console.log(valid==null);
    console.log(req.params.id);
    res.send({result:"Update"})
})


 module.exports = routes