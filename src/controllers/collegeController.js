const collegeModel = require("../models/collegeModel")
const jwt = require("jsonwebtoken");

const createCollege_Doc = async function (req, res){
  try{
    const {name, fullName, logoLink} = req.body
    if(!name){
      return res.status(400).send({ status:false, msg: "BAD REQUEST please provied valid name"})
    }
    if(!fullName){
      return res.status(400).send({ status:false, msg: "BAD REQUEST please provied valid fullName"})
    }
    if(!logoLink){
      return res.status(400).send({ status:false, msg: "BAD REQUEST please provied valid logoLink"})
    }
    
    const college =await collegeModel.create(req.body)
    return res.status(201).send({ status: true, msg: college})

  }
  catch (err){
  return res.status(500).send({status:false, msg:err.message })}
}




module.exports.createCollege_Doc = createCollege_Doc
//module.exports.loginAuthor = loginAuthor



// POST /functionup/colleges
// Create a college - a document for each member of the group

// The logo link will be provided to you by the mentors. This link is a s3 (Amazon's Simple Service) url. Try accessing the link to see if the link is public or not.

// Endpoint: BASE_URL/functionup/colleges