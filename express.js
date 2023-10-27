import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"backend",
})
.then(()=>console.log("database connected"))
.catch((e)=>console.log(e));

const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
});
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});
const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;
    if(token){
        const decoded = jwt.verify(token,"snanjfnkjsnkglna");
        // console.log(decoded);
        req.user = await User.findById(decoded._id);
        next();
    }
    else{
        res.redirect("/login");
    }
}
const Messge = mongoose.model("Message",messageSchema);
const User = mongoose.model("User",userSchema);         // collection of users.
const app = express();
// setting up view engine
app.set("view engine","ejs");           // now no need to give extension

// using middlewares
app.use(express.static(path.join(path.resolve(),"public")));  // it's a middleware so to use we need app.use();
app.use(express.urlencoded({extended:true}));       // it is used to read form data
app.use(cookieParser());
const users = [];
// app.get('/',(req,res)=>{
//     // res.send("Hi");
//     // res.json({
//     //     success:true,
//     //     products:[],
//     // })

//     // const pathLocation = path.resolve();            // it'll give the current directory
//     // res.sendFile(path.join(pathLocation,"./index.html"));

//     // res.render("index",{name:"Karan"});
//     // res.send("index");          // now it'll work because we have now made index public

//     // res.render("index");
//     const token = req.cookies.token;
//     // console.log(token);
//     if(token){
//         res.render("logout");
//     }
//     else{
//         res.render("login");
//     }
//     // res.render("login");
    
// })


// app.get('/success',(req,res)=>{
//     res.render("success");
// })
// app.get('/add',(req,res)=>{
//     Messge.create({name:"Abhi",email:"sample@gmail.com"}).then(()=>{
//         res.send("Nice");
//     })
// })

// ---- another method for the above api-----
// app.get('/add',async (req,res)=>{
//     await Messge.create({name:"abhi2",email:"sample2@gmail.com"});
    // res.send("nice");
// })

// app.post('/contact',async (req,res)=>{
//     console.log(req.body);
//     // users.push({name:req.body.name,email:req.body.email});
//     const messageData = {name:req.body.data,email:req.body.email};
//     console.log(messageData);
//     const {name,email} = req.body;
//     // await Messge.create({name:req.body.name,email:req.body.email});
//     await Messge.create({name,email});
//     // res.render("success");
//     res.redirect('/success');
// })


app.get('/',isAuthenticated,(req,res)=>{
    // console.log(req.user);
    res.render("logout",{name:req.user.name});
})
app.get('/login',(req,res)=>{
    res.render("login");
})
app.get('/register',(req,res)=>{
    res.render("register");
})
app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        return res.redirect("/register");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.render("login",{email,message:"Incorrect Password"});
    }
    const token = jwt.sign({_id:user._id},"snanjfnkjsnkglna");
    // console.log(token);
    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+60*1000),
    });
    res.redirect('/');
})
app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if(user){
        res.redirect("login");
    }
    const hashedP = await bcrypt.hash(password,10);
    user = await User.create({
        name,email,password:hashedP,
    });
    const token = jwt.sign({_id:user._id},"snanjfnkjsnkglna");
    // console.log(token);
    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+60*1000),
    });
    res.redirect('/');
})
app.get('/logout',(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    })
    res.redirect('/');
})

// app.get('/getUsers',(req,res)=>{
//     res.json({
//         users,
//     })
// })
app.listen(5000,()=>{
    console.log("server is listening");
});
