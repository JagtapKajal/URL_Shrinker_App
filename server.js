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

app.get('/:Shorturl', async(req, res) =>{
   const shorturl = await Shorturl.findOne({short: req.params.Shorturl}) 
   if(shorturl == null) return res.sendStatus(404)

    shorturl.clicks++
    shorturl.save()

    res.redirect(shorturl.full)
})


app.listen(process.env.PORT || 5000);
