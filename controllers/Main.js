const path = require("path")
const User = require("../models/User")
const Jobs = require("../models/Jobs")
const Contact = require("../models/Contact")
exports.home = async (req, res) => {
 try {
    console.log("--------------req.body:",req.body)
    const data = await Jobs.find().sort({ createdAt: -1 });
      console.log("------------------data--------------")
      console.log(data);
      res.render('index', { jobs: data, title: 'Home' });
       // res.render('index', { jobs: jobs });
    } catch (error) {
    console.log(error)
    res.json({status:false,message:error.message});
 } 
}

exports.about = async (req, res) => {
  // Render the EJS template, passing data as an object

  res.render('aboutus');
}

exports.contact = async (req, res) => {
  // Render the EJS template, passing data as an object
  res.render('contact');
}


// test code
//submitting data routes
exports.createUser = async (req, res) => {
  console.log("POST req made on" + req.url);
  console.log("Form submitted to server");


  /*Note: when you are passing form obj directly to collection using model you
          have to give same name in form of that data that is to be passed in database 
          and that name is declared inside schema*/
  const user = new User(req.body); //passing object of form data directly to collection
  user.save() //then saving this to database and this return promise
    .then(result => {
      res.redirect('/');//is success save this will redirect to home page
    })
    .catch(err => { //if data not saved error showed
      console.log(err);
    });
}

exports.createContact = async (req, res) => {
  console.log("POST req made on" + req.url);
  console.log("Form submitted to server");
  console.log("--------------req.body",req.body)

  /*Note: when you are passing form obj directly to collection using model you
          have to give same name in form of that data that is to be passed in database 
          and that name is declared inside schema*/
  const contact = new Contact(req.body); //passing object of form data directly to collection
  await contact.save() //then saving this to database and this return promise
    .then(result => {
      console.log(contact);
      res.redirect('/');//is success save this will redirect to home page
    })
    .catch(err => { //if data not saved error showed
      console.log(err);
    });

}