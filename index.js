const express = require('express');
/* const router = require('./routes/pages/router') */
const app = express();
const port = 8000
app.set('view engine', 'ejs')

app.use(express.static("public"));


app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/signin', (req, res) =>{
    res.render('signin')
})

app.get('/homepro', (req,res)=>{
    res.render('homepro')
})

app.listen(port, ()=>{
    console.log('server is running on port 8000')
})