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

app.get('/', (req, res) => {
    // Render the EJS template, passing data as an object
    // res.render('index');
    const jobs = [
      { title: 'Job Title 1', description: 'Job Description 1' },
      { title: 'Job Title 2', description: 'Job Description 2' },
      { title: 'Job Title 1', description: 'Job Description 1' },
      { title: 'Job Title 2', description: 'Job Description 2' },
      { title: 'Job Title 1', description: 'Job Description 1' },
      { title: 'Job Title 2', description: 'Job Description 2' },
      // Add more job data as needed
    ];

    res.render('index', { jobs: jobs }); 
  });

app.get('/about-us', (req, res) => {
    // Render the EJS template, passing data as an object
    res.render('aboutus');
  });

app.get('/contact', (req, res) => {
    // Render the EJS template, passing data as an object
    res.render('contact');
  });

connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in DEV mode.`)
})