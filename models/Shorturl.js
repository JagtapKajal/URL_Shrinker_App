const mongoose = require('mongoose')
const shortid = require('shortid')
const ShortUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required :true
    },
})