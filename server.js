const express = require('express')
app = express()
const { urlencoded } = require('express')
const { type } = require('express/lib/response')
const validUrl = require('valid-url')
const mongoose = require('mongoose')
const urlModel = require('./models/schema')
const PORT = 3000

mongoose.connect('mongodb://localhost/freecodecamp_db_urlshortner',{
    useNewUrlParser : true, useUnifiedTopology : true
})
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')


app.get('/', async (req,res)=>{
    const urls = await urlModel.find()
    res.render('index', {urls : urls})
})

app.post('/api/shorturl', async (req,res) => {
    if (!validUrl.isUri(req.body.fullUrl)) return res.json({ 'error': 'invalid url' })

    let urlMatched = await urlModel.findOne({full:req.body.fullUrl})
    if (urlMatched == null) {
        await urlModel.create({full : req.body.fullUrl})
        urlMatched = await urlModel.findOne({full:req.body.fullUrl})
    }
    res.json({"original_url":urlMatched.full, "short_url": urlMatched.short})
})

app.get('/api/shorturl/:short', async (req,res) => {
    const shortUrlMatched = await urlModel.findOne({short : req.params.short})
    res.redirect(shortUrlMatched.full)
})

app.listen(PORT, function(err){
    if (err) console.log('err')
    console.log('server is listening')
})



//--------------------------------------
/*
let test2 = null
const test = urlModel.find({},(error,data)=>{
    if (error) {
        //console.log(error)
    } else {
        //console.log(data)
        test2 = data
        return data
    }
})

console.log(test2)
*/