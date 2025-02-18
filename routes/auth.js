const routes = require("express").Router();
const { json } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");


routes.get("/", (req, res) => {
    res.send("auth")
})

routes.post("/register", async (req, res) => {


    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            desc:req.body.desc
        })

        const newUser = await user.save();
        res.send(json(newUser))
    } catch (err) {
        console.log(err)
    }

    res.send("Data Stored");
});

routes.post("/login",async (req,res)=>{
    try {
        console.log(req.body.email);
        const user  = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        const validPass = await bcrypt.compare(req.body.password,user.password)
        !validPass && res.status(404).json("Wrong password");

        res.send(user);

        
    } catch (error) {
        console.log(error)
    }
})

module.exports = routes