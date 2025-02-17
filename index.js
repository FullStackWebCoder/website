const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const app  = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewURLParser:true, useUnifiedTopology:true})
.then(console.log("db connected"))
.catch((error)=>{console.log(error)});

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);



app.listen(8000,()=>{
    console.log("Server connected");
})