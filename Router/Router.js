const express=require("express");
const router = express.Router();
const path=require("path")

const {home,about,contact,createUser,createContact,searchJobs} = require("../controllers/Main")
const {uploadfile}= require('../middleware/uploadMiddleware');

router.post("/user",uploadfile,createUser)
router.get("/",home);
router.post('/contact',createContact);
router.get('/about-us', about);
router.get('/contact',contact);
// router.get('/searchJobs',searchJobs);
module.exports=router;