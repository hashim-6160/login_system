const express = require("express");
const path = require("path");
const bodyparser=require("body-parser");
const session= require("express-session");
const{v4:uuidv4}=require("uuid");
const router = require('./router');

const app = express();

const port = process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}))

app.set('view engine','ejs');

//middleware to set cache control header
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret : uuidv4(),
    resave : false,
    saveUninitialized : true,
}));


app.use('/route',router);


//homeroute
app.get('/', (req, res) =>{
    if(req.session.user){
        res.redirect('/route/dashboard');
    }else{
        res.render('base', { title : "Login System"});
    }
    
})


app.listen(port,()=>{
    console.log('Listening to the server on http://localhost:3000');
})

