const express = require('express');
const homeRouter = require('./routes/home') 
const authRouter = require('./routes/authRouter')
const posts=require('./routes/BlogRoutes')
const methodOverride = require('method-override');


// connect to db :
const connectDB=require('./config/db')
connectDB()
const app = express();
const port = 8000
app.set('view engine', 'ejs')

// -- middlwares:
app.use(express.static("public"));
app.use(express.urlencoded( {extended:false} ));
app.use(methodOverride('_method'));
app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/' , posts)


// ------- should be used in router



// app.get('/signin', (req, res) =>{
//     res.render('signin')
// })

// app.get('/homepro', (req,res)=>{
//     res.render('homepro')
// })
// app.get('/signup', (req,res)=>{
//     res.render('signup')
// })

app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})