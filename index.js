//making the server
const express= require("express")
const res = require("express/lib/response")
const app = express()
const  port = 5000
const reemproject=(__dirname,"/reemproject")


//connecting mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/user").then(
  () => {
    console.log("MongoDb is Ready to use");
  },
 (err) => {
    console.log(err);
  }
);

//making schema
const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
    email: { type: String, required: true},
    age: { type: Number, required: false },
  
  });
const User = mongoose.model("User Model", userSchema);



//adding data in schema
app.get("/r" , (req , res)=>{
    const user = new User({
        name:"Reem",
       email: "reemaldhamsheh@email.com",
        age:15 ,
    }) 
    user.save()
    .then((result) => {
  res.json(result);
 })
 .catch((err) => {
     res.json(err);
  });
})





//read
app.get("/read" , (req , res)=>{
    User.find().then((result)=>{
        res.render(reemproject+'/main.ejs',{result:result})
    }).catch((err)=>{
        res.json(err)
     })
 })


app.listen(port , ()=>{
    console.log('server working at port 5000');
})