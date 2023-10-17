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



//submitting data routes
exports.createUser = async (req, res) => {
  console.log("POST req made on" + req.url);
  console.log("Form submitted to server");
  const user = new User(req.body); //passing object of form data directly to collection
  try{
    console.log("----request body----create user",req.body);
    const user = new User(req.body);
    await user.save();
    res.redirect('/');

  }catch(error){
    console.log("-----error in creating user",error);
    res.json({status:false, message:error.message});

  }
}

exports.createContact = async (req, res) => {
  console.log("POST req made on" + req.url);
  console.log("Form submitted to server");
  console.log("--------------req.body",req.body)

  /*Note: when you are passing form obj directly to collection using model you
          have to give same name in form of that data that is to be passed in database 
          and that name is declared inside schema*/
  try{
    const contact = new Contact(req.body); //passing object of form data directly to collection
    await contact.save();
    console.log("🚀 ~ file: Main.js:61 ~ exports.createContact= ~ contact:", contact)
  }catch(error){
    console.log("------error-------",error);
    res.json({status:false,message:error.message});
  }

}