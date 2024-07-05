var express = require("express");
var router = express();


const credentials ={
    email : "admin@gmail.com",
    password : "12345"
}


//login user
router.post('/login',(req,res)=>{
    
    if(req.body.email==credentials.email&&req.body.password==credentials.password){
        req.session.user = req.body.email;
        res.status(303).redirect('/route/dashboard')  
    }else{
        res.render('base',{title : "Express", error : "Invalid password or username"})
    }
})

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.redirect('/')
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{title : "Express", logout : "Logged Out Successfully"})
        }
    })
})


module.exports = router;

