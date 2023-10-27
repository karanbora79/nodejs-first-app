// console.log("hello world");
// console.log("hello karan");

// -------------------------------------CREATING A SERVER---------------------------------------------

// const http = require("http");
// const gfName = require("./feature.js")

// import http from "http";
// import mygf from "./feature.js"
// import { gf2,gf3 } from "./feature.js";
// import * as myObj from "./feature.js"
// import { generateLovePerc } from "./feature.js";

// console.log(mygf);
// console.log(gf2);
// console.log(myObj);
// console.log(generateLovePerc());

// const server = http.createServer((req,res)=>{
//     if(req.url === "/about"){
//         res.end(`Love is ${generateLovePerc()}`);
//     }
//     else if(req.url === "/"){
//         res.end("home page");
//     }
//     else if(req.url === "/contact"){
//         res.end("contact page");
//     }
//     else{
//         res.end("page not found");
//     }
// })
// server.listen(5000,()=>{
//     console.log("server is working");
// })


// ----------------------------------EXPRESS-----------------------------------------
import { Express } from "express";