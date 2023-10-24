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
// const storage = multer.memoryStorage();
// const upload = multer({ dest: '' });

const admin = require('firebase-admin');

const serviceAccount = require('../config/firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'jobportal-a6957.appspot.com', // Replace with your Firebase Storage URL
});



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
    console.log("----request file----create user",req.file);
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  const bucket = admin.storage().bucket();
  const file = bucket.file('resumes/' + req.file.originalname);
  // console.log("-------file:",file);
  const blobStream = file.createWriteStream({
      metadata: {
          contentType: req.file.mimetype,
      },
  });

  console.log("--------blobStream",blobStream)

  var blobStreamStatus ;

  blobStream.on('error', (error) => {
    console.log("---------error:",error.message)
      console.error(error);
      blobStreamStatus = false;
  });

  blobStream.on('finish', () => {
    console.log("--------finish:");
      blobStreamStatus= true;
  });

  blobStream.on('data', (chunk) => {
    console.log('Uploading chunk of data...');
});

  blobStream.end(req.file.buffer);
  var resume ="";
  if(blobStreamStatus == true)
  {
    resume = "url";
  }

  console.log("-------resume:",resume);
  // var testVar=bucket.upload(req.file.buffer);// i used uploadBytes and it worked
  // console.log("---test var------",testVar);
// process.exit(0);
    console.log("---------i am here");
    const user = new User(req.body);
    await user.save();
    //-------------------downloading a file-------------------
  //   async function downloadFile() {
  //     const options = {
  //       // The path to which the file should be downloaded, e.g. "./file.txt"
  //       destination: "c:/jobportal/resumes/",
  //     };
  //     // Downloads the file
  //     await storage.bucket(bucketName).file(srcFilename).download(options);
  //     console.log(`gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`);
  // }
  // downloadFile().catch(console.error);
    //-----------------downloading a file code ends here-----------------------
    console.log("----user-------", user)
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

//search field searching based on job location
// exports.searchJobs = async (req, res) => {
//   try {
//     const jobLocation=req.query;
//     console.log(jobLocation,jobLocation["jobLocation"]);
//     console.log("--------------req.query:",req.query)
//     const data = await Jobs.find({"jobLocation":jobLocation["jobLocation"]}).sort({ createdAt: -1 });
//       console.log("------------------data for search field--------------")
//       console.log(data);
//       res.render('index', { jobs: data, title: 'Home' });
//        // res.render('index', { jobs: jobs });
//     } catch (error) {
//     console.log(error)
//     res.json({status:false,message:error.message});
//  } 

// }