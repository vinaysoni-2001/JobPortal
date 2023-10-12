require('dotenv').config({path:".env"})
const express=require('express');
const router = require('./Router/Router.js');
const bodyParser= require('body-parser');
const app = express();
const path=require("path")
app.use("/",router);
app.set("view engine","ejs");

const connectDatabase = require('./database.js')

app.use(express.json());
app.use(express.urlencoded({extended:true}))


// connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in DEV mode.`)
})