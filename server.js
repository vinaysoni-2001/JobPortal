require('dotenv').config({path:".env"})
const express = require('express');
const router = require('./Router/Router.js');
const bodyParser= require('body-parser');
const app = express();
const path=require("path")

console.log("-----------view",path.join(__dirname, 'views'))
app.set('views', path.join(__dirname, 'views'));

const connectDatabase = require('./database.js')
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/",router);
app.set("view engine","ejs");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'views')));


connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in DEV mode.`)
})

// require('dotenv').config({path:".env"})
// const express=require('express');
// const app=express();
// const path=require('path');
// // const cors=require('cors');
// // const{default:mongoose}=require('mongoose');

// // require("./src/connections/moongodb");
// // const static_path=path.join(__dirname,"./public");

// // app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
// // app.use(express.static(static_path));
// app.set("view engine","ejs");

// // console.log('-------NODE ENV---- ', process.env.NODE_ENV);

// // const routes = require('./src/api/GAME/router/index')(app); 
// const router = require('./Router/Router.js')
// app.use("/",router);

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//     console.log("----Captain Wheel Node Server Started on ----- ", PORT);
// });
