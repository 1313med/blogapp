const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const post=require('../modles/posts')
// require users data 
const User=require('../modles/users')

router.post('/signup' , async(req ,res)=>{
    try {
        const { username, password } =req.body;
        const hashedPassword = await bcrypt.hash(password,10);
// add it to the schema
        const newUser = new User({
            username:username,
            password:hashedPassword
          });
// save the data
          const user = await newUser.save();
          console.log( 'user created',user);
        res.redirect('/signin')
    } catch (error) {
        console.error('Error in route postRegister:', error); 
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
router.post('/signin', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username in the database
      const user = await User.findOne({ username });
  
      console.log(user)
      // If the user doesn't exist, redirect back to the signin page
      if (!user) {
        return res.redirect('/signin');
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords match, redirect to the home page
      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, 'mouad' ) ;
    res.cookie('token',token, {httpOnly:true});
        return res.redirect('/displayBlog');

      }
  
      // If passwords don't match, redirect back to the signin page
      return res.redirect('/signin');
    } catch (error) {
      console.log('route signin error:', error);
      res.send('Something went wrong');
    }
  });





module.exports=router

