// new model  name, mobile no, email,resume ,job title
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  jobProfile: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // resume: {
  //   type: String,
  //   required: true
  // },
  city:{
    type:String,
    required: true
  },
  number:{
    type:Number,
    required: true
  },
},  //this will auto update the timestamp when we do inserting or updating documents of this type schema
{ timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;

/*at first we make a schema that define structure and then created model based on that schema in 33 by 
  passing 2args 1st is singular name of collection then the schema that define structure for that object */

  //and finally exporting that User models which is later used to do CRUD operation