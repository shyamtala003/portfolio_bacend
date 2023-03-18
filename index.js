require("dotenv").config();
const express=require('express');
const app=express();
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

// import mongoose models
const Email = require('./models/emailSchema');


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// connect to database
mongoose.connect(process.env.MONGODB_URL).then(res => console.log("connection established successfully")).catch(err => console.log(err))

app.post('/getEmail', async(req, res) => {
    try {
        // 1 collect email
        let email = req.body.email;
        
        // 2. check if email allready exists or not
        let userExist=await Email.findOne({email:email});
        if(userExist){
            return res.status(200).json({success:false, message:"Email already exists"})
        }

        // 2 store it to the database
        let result=await Email.create({email:email});
         res.status(201).json({success:true, message:"You have successfully subscribed our newsletter"})
    } catch (error) {
        res.status(200).json({success:false, message:error.message})
    }
})

app.listen(process.env.PORT,()=>console.log("server is running on port " + process.env.PORT));