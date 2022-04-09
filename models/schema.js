const mongoose = require('mongoose')
const shortId = require('shortid')
const { v4: uuidv4 } = require('uuid')

const urlSchema = new mongoose.Schema({
    full : {
        type : String,
        required : true
    },
    short : {
        type : String,
        required : true,
        default : shortId.generate
    },
    uuid : {
        type : String,
        required : true,
        default : uuidv4()
    }
})

module.exports = mongoose.model('urlModel',urlSchema)
