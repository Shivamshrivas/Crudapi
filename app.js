//require("dotenv").config();

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs');
const userRoutes = require('./routes/userRoutes');

const port=3000;  
const db='mongodb+srv://shiv:MukulSona4747@cluster0.w1ogn.mongodb.net/Cruddata';
mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log("connected successfully"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user",userRoutes);


app.listen(port,(err)=>{
    if(err) return console.error(err);
    else
    console.log(`Running on port no ${port}`);
});