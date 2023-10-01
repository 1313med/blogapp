const express=require('express')
const jwt=require('jsonwebtoken')


const router=express.Router()


const Post = require('../modles/posts')


router.post('/create/posts' ,async (req , res)=>{
try{


const {title , content }=req.body ;
const newpost= new Post({
    title:title , 
    content:content ,

})

const post = await newpost.save();
console.log( 'user created',post);
res.redirect('/displayBlog')
}catch (error) {
    console.log('route signin error:', error);
    res.send('Something went wrong');
  }

})



router.get('/create/posts', (req,res)=>{
    res.render('posts')
})

module.exports=router