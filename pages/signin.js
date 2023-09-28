const express=require('express')
const router=require('router')
const users = [
    { name: "User1", password: "password1" },
    { name: "User2", password: "password2" },
    { name: "User3", password: "password3" },
    // Add more users as needed
  ];
router.post('/signin' , (req , res )=>{
    const {name , password}=req.body
    const findUser=users.find((u)=>u.name===name)
    if(findUser){
        
})



// hashing the password 
// MongoDb
  

