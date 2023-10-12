const express=require("express");
const router = express.Router();
const path=require("path")

const {home} = require("../controllers/AddUser")

// router.get("/",home);

module.exports=router;