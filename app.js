const express= require("express");
const path = require("path");
const fs= require("fs");
const app=express();
const bodyParser=require("body-parser");
const port=8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

  });

  const Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static("static"))
app.use(express.urlencoded());


app.set('view engine','pug');
app.set('views', path.join(__dirname,'views'));

//ENDPOINTS
app.get('/',(req,res)=>{
   const con="This is the best content on internet so far";
   const params={'title':"Pug is the best", "content":con};
   res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const con="This is the best content on internet so far";
    const params={'title':"Pug is the best", "content":con};
    res.status(200).render('contact.pug',params);
 })

 app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("Contact details saved in db");
    }).catch(()=>{
        res.status(400).send("item could not be saved to db")
    })

    // res.status(200).render('contact.pug');
 })

//START THE SERVER

app.listen(port,()=>{
    console.log(`The application started succesfully on ${port}`);
})