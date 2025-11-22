const express = require('express')

const app = express()

mongoose.connect('mongodb://localhost/urlshortener');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))