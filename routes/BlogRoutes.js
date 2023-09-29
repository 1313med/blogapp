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
// const authMiddleware = (req,res,next) => { 
//     const token = req.cookies.token ;
//     console.log('token', token  );
//     if(!token){ 
//         return res.status(401).json({message: 'Unauthorized'})
//     }
//     try{ 
//         const decoded = jwt.verify(token, 'MouadSecret') ;
//         console.log('Generated token:', token);
//         req.userId = decoded.userId ;
//         next();
//     }catch(e){ 
//         res.status(401).json({message: 'Unauthorized'})
//     }
// }
const authMiddleware = (req,res,next) => { 
    const token = req.cookies.token ;
    console.log('token', token  );
    if(!token){ 
        return res.status(401).json({message: 'Unauthorized'})
    }
    try{ 
        const decoded = jwt.verify(token, 'mouad') ;
        req.userId = decoded.userId ;
        next();
    }catch(e){ 
        res.status(401).json({message: 'Unauthorized'})
    }
}

router.use(authMiddleware)

router.get('/displayBlog' , async(req ,res)=>{

    const data=await Post.find()
    res.render('homeAuth' , {data})
  })

router.get('/create/posts', (req,res)=>{
    res.render('posts')
})

module.exports=router