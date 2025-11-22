const express = require('express')
const mongoose = require('mongoose')
const Shorturl = require('./models/Shorturl')


const app = express()

//database URL 
mongoose.connect('mongodb://localhost/urlshortener');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shorturls = await Shorturl.find()
  res.render('index', { shorturls: shorturls })
})

app.post('/shorturls', async (req, res) => {
  const fullUrl = req.body.Fullurl;
  const urlObj = new URL(fullUrl);
  let domain = urlObj.hostname.replace("www.", "").split('.')[0];

  //Check if domain already used
  let shortCode = domain;
  const exists = await Shorturl.findOne({ short: shortCode });
  if (exists) {
    shortCode = `${domain}-${Math.floor(Math.random() * 1000)}`;
  }

  //UPDATED: Add full + meaningful short code
  await Shorturl.create({
    full: fullUrl,
    short: shortCode
  });

  res.redirect('/')
})

app.get('/delete/:code', async (req, res) => {
  await Shorturl.findOneAndDelete({ short: req.params.code });
  res.redirect('/');
});

app.get('/:Shorturl', async (req, res) => {
  const shorturl = await Shorturl.findOne({ short: req.params.Shorturl })
  if (shorturl == null) return res.sendStatus(404)

  shorturl.clicks++
  shorturl.lastClickedAt = new Date();
  shorturl.save()

  res.redirect(shorturl.full)
})

app.post('/delete/:short', async (req, res) => {
  try {
    await Shorturl.findOneAndDelete({ short: req.params.short });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting URL');
  }
});



app.listen(process.env.PORT || 5000);
