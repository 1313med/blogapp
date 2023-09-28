const express = require('express');
const router = require('./pages/home') 
const app = express();
const port = 8000
app.set('view engine', 'ejs')

app.use(express.static("public"));


app.use('/', router)

app.get('/signin', (req, res) =>{
    res.render('signin')
})

app.get('/homepro', (req,res)=>{
    res.render('homepro')
})
app.get('/signup', (req,res)=>{
    res.render('signup')
})

app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})