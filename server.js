const express = require('express')
const Shorturl = require('./models/Shorturl')


const app = express()

mongoose.connect('mongodb://localhost/urlshortener');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/',async (req, res) =>{
  const shorturls = await Shorturl.find()
res.render('index', {shorturls: shorturls})
})

app.post('/shorturls', async(req, res) =>{
    await
Shorturl.create({full:req.body.Fullurl})

res.redirect('/')
})