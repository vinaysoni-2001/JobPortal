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

const {home,about,contact,createContact} = require("./controllers/Main")
// will remove the code below
const User = require("./models/User")
const {initializeApp} = require('firebase/app')
// import { getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
const {getStorage} = require("firebase/storage")
const {ref} = require("firebase/storage")
const {getDownloadURL} = require("firebase/storage")
const {uploadBytesResumable} = require("firebase/storage")
const multer = require("multer")
const config = require("./config/firebase")

initializeApp(config.firebaseConfig)
const storage = getStorage()
const upload = multer({storage:multer.memoryStorage()})
// will remove code till here
app.get('/',home);

app.get('/about-us', about);
app.get('/contact',contact);
app.post('/user',upload.array("Resume"),async (req, res) => {
    // console.log("POST req made on" + req.url);
    // console.log("Form submitted to server");
    // const user = new User(req.body); //passing object of form data directly to collection
    try{
      console.log("----request body----create user",req.body);
      // const storageRef= ref(storage,req.file.originalname);console.log("---------i am storageref",storageRef);
      // const metadata={
      //   contentType : req.file.mimetype,
      // }
      // console.log("---------i am metadata",req.file.mimetype);
      // const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      // const downloadURL = getDownloadURL(snapshot.ref);
      // console.log("---------i am downloadurl",downloadURL);
  
      const userData={
        "name":req.body.name,
        "age":req.body.age,
        "email":req.body.email,
        "city":req.body.city,
        "number":req.body.number
      }
      const user = new User(userData);//new User(req.body);
      await user.save();
      res.json({status:true,message:"success"});
  
    }catch(error){
      console.log("-----error in creating user",error);
      res.json({status:false, message:error.message});
  
    }
  })




app.post('/contact',createContact);


connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in DEV mode.`)
})