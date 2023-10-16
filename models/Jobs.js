// new model  name, mobile no, email,resume ,job title
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  Experience: {
    type: String,
    required: true,
  },
  other: {
    type: String,
    required: true,
  },
},  //this will auto update the timestamp when we do inserting or updating documents of this type schema
{ timestamps: true });

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;

/*at first we make a schema that define structure and then created model based on that schema in 33 by 
  passing 2args 1st is singular name of collection then the schema that define structure for that object */

  //and finally exporting that User models which is later used to do CRUD operation