const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')


// require users data 
const User=require('../modles/users')

router.post('/signup' , async(req ,res)=>{
    try {
        const { username, password } =req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username:username,
            password:hashedPassword
          });

          const user = await newUser.save();
          console.log( 'user created',user);
        res.redirect('/signin')
    } catch (error) {
        console.log('route postRegister : ',error);
        res.send('something went wrong')
    }
})






router.get('/signup', (req,res)=>{
    res.render('signup')

})

router.get('/signin', (req, res) =>{
    res.render('signin')
})

module.exports=router

