const express = require('express')
const qr_code = require('qrcode')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/', (req,res) => {
    res.render('home')
})

app.post('/scan', (req,res) => {
    const url = req.body.input
     console.log(req.body)
    if(!url){
        res.status(400).send('There is no URL provided to be scanned')
    }else{
        qr_code.toDataURL(url)
        .then(url => {
           res.render('scan' , { img : url })
        }).catch(err => {
           res.status(400).send('Error Occured!!')
        })
    }
})


app.listen(PORT , () => console.log(`Listening on ${PORT}`))