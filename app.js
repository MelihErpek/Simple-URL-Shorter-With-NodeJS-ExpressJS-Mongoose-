const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser2 = require("body-parser")
const Article = require("./models/Article")
app.use(bodyParser2.json())


const MongoClient = require('mongodb').MongoClient;
const uri = ""; // MongoDB connection link
let link;


mongoose.connect("", {              // MongoDB connection link
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true},
(err) =>{ if(err) { throw err} console.log("mongoose ile bağlantı kuruldu")}
   
);
app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})
app.get("/:sL",(req,res)=>{
    const sL = req.params.sL;
    
    MongoClient.connect(uri,{useNewUrlParser: true,useUnifiedTopology:true},function(err,db){
        if(err) throw err;
        var dbo = db.db("urlShorter");
        dbo.collection("examples").findOne({  shortLink : sL },(err,result)=>{
            if(err) throw err;
            res.redirect('https://'+result.mainLink)
            })
        
    })
    
})

app.post('/',(req,res)=>{
    let oL = req.body.mainLink;
    let sL = oL[oL.length-3]+Date.now().toString().substring(9,11)+oL[oL.length-5];
    var url = new Article({
        mainLink : oL,
        shortLink : sL  
    })
    url.save()
    res.json(sL)
})


app.listen(3000)

