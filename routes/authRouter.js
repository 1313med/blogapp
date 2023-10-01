const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const Post=require('../modles/posts')
// require users data 

const User=require('../modles/users')
router.use(cookieParser());

const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json( { message: 'Unauthorized'} );
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}


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
        // console.error('Error in route postRegister:', error); 
        // console.log('route postRegister : ',error);
        res.send('something went wrong')
    }
})






router.get('/signup', (req,res)=>{
    res.render('signup')

})

router.get('/signin', (req, res) =>{
    res.render('signin')
})

const secretKey = 'simoSecret'
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
        // sign the jwt token to user
        const token = jwt.sign({ userId: user._id }, secretKey ) ;
        // store it to cookie
        
        res.cookie('token', token);
        return res.redirect('/displayBlog');

      }
  
      // If passwords don't match, redirect back to the signin page
      return res.redirect('/signin');
    } catch (error) {
      console.log('route signin error:', error);
      res.send('Something went wrong');
    }
  });
  




router.get('/displayBlog',  authMiddleware, async (req, res) => {
   try {
     // Assuming you have defined the Post model for fetching data
     const data = await Post.find();
     res.render('homeAuth', { data });
   } catch (error) {
     // Handle any errors that occurred during data retrieval
     res.status(500).json({ error: 'Internal server error' });
   }
 });




// get contents (content route) another page

 router.get('/content',  authMiddleware, async (req, res) => {
  try {
    // Assuming you have defined the Post model for fetching data
    const data = await Post.find();
    res.render('content', { data });
  } catch (error) {
    // Handle any errors that occurred during data retrieval
    res.status(500).json({ error: 'Internal server error' });
  }
});


// edit post :

router.get('/editPost/:id', authMiddleware, async (req, res) => {
  try {

    const data = await Post.findOne({ _id: req.params.id });

    res.render('editPost', {
    
      data,
      
    })

  } catch (error) {
    console.log(error);
  }

});

// update blog 
router.put('/editPost/:id', authMiddleware, async (req, res) => {
  try {

    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      updatedAt: Date.now()
    });

    res.redirect(`/editPost/${req.params.id}`);

  } catch (error) {
    console.log(error);
  }

});





module.exports=router

