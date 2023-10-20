const path = require("path")
const User = require("../models/User")
const Jobs = require("../models/Jobs")
const Contact = require("../models/Contact")
// const {initializeApp} = require('firebase/app')
// import { getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
// const {getStorage} = require("firebase/storage")
// const {ref} = require("firebase/storage")
// const {getDownloadURL} = require("firebase/storage")
// const {uploadBytesResumable} = require("firebase/storage")
const multer = require("multer")
// const config = require("../config/firebase")

// initializeApp(config.firebaseConfig)
const storage = multer.memoryStorage();
const upload = multer({ dest: '' });



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

  try{
  
    // console.log("---------req",req);
    console.log("----request body----create user",req.body);
     

    console.log("---------i am here");
    const user = new User(req.body);
    await user.save();
    console.log("🚀 ~ file: Main.js:60 ~ exports.createUser= ~ user:", user)
    res.json({status:true,message:"success"});

  }catch(error){
    console.log("-----error in creating user",error);
    res.json({status:false, message:error.message});

  }
}

exports.createContact = async (req, res) => {
  try{
    console.log("--------------req.body",req.body)
    const contact = new Contact(req.body); //passing object of form data directly to collection
    await contact.save();
    console.log("🚀 ~ file: Main.js:82 ~ exports.createContact= ~ contact:", contact)
    res.json({status:true,message:"success"});
  }catch(error){
    console.log("------error-------",error);
    res.json({status:false,message:error.message});
  }

}