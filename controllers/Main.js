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
// const multer = require("multer")
// const config = require("../config/firebase")

// initializeApp(config.firebaseConfig)
// const storage = getStorage()
// const upload = multer({storage:multer.memoryStorage()})



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
/*
exports.createUser = async (req, res) => {
  // console.log("POST req made on" + req.url);
  // console.log("Form submitted to server");
  // const user = new User(req.body); //passing object of form data directly to collection
  try{
    console.log("--------req",req)
    console.log("----request body----create user",req.body);

    process.exit(0);  
    console.log("---------i am here");
    const storageRef= ref(storage,req.file.originalname);console.log("---------i am storageref",storageRef);
    const metadata={
      contentType : req.file.mimetype,
    }
    console.log("---------i am metadata",req.file.mimetype);
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = getDownloadURL(snapshot.ref);
    console.log("---------i am downloadurl",downloadURL);

    const user = new User(req.body);
    await user.save();
    res.json({status:true,message:"success"});

  }catch(error){
    console.log("-----error in creating user",error);
    res.json({status:false, message:error.message});

  }
}
*/

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
    res.json({status:true,message:"success"});
  }catch(error){
    console.log("------error-------",error);
    res.json({status:false,message:error.message});
  }

}