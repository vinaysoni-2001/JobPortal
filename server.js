require('dotenv').config({path:".env"})
const express = require('express');
const router = require('./Router/Router.js');
const bodyParser= require('body-parser');
const app = express();
const path=require("path")
app.use("/",router);
app.set("view engine","ejs");

console.log("-----------view",path.join(__dirname, 'views'))
app.set('views', path.join(__dirname, 'views'));

const connectDatabase = require('./database.js')
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname, 'views')));

const {home,about,contact} = require("./controllers/Main")

app.get('/',home);

app.get('/about-us', about);
app.get('/contact',contact);

connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in DEV mode.`)
})