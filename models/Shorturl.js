const mongoose = require('mongoose')
const shortid = require('shortid')
const ShortUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required :true
    },
     short :{
        type : String,
        required : true,
        default : shortid.generate
    },
    clicks : {
        type : Number,
        required : true,
        default : 0
    },
     lastClickedAt: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('shorturl', ShortUrlSchema)