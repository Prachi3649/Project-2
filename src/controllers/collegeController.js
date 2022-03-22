const collegeModel = require("../models/collegeModel")
const internModel =require("../models/internModel")
//const jwt = require("jsonwebtoken");

const createCollege_Doc = async function (req, res) {
  try {
    const { name, fullName, logoLink } = req.body
    if (!name) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid name" })
    }
    if (!fullName) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid fullName" })
    }
    if (!logoLink) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid logoLink" })
    }

    const college = await collegeModel.create(req.body)
    return res.status(201).send({ status: true, msg: college })

  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}


const collegeDetails = async function(req, res){
  try{
     const collegeName = req.query.collegeName

     if(!collegeName){return res.status(400).send({status:false, msg:"BAD REQUEST please provied valid collegeName"})}
     const college =await collegeModel.find({ name:collegeName, isDeleted: false })
     if (!college) {
        return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
      }
       console.log(college)
      const collegeId = college[0]._id
    //   delete req.body["collegeName"]
      
        const interName = await internModel.find({collegeId: collegeId, isDeleted : false})
        if(interName.length <= 0){res.status(404).send({msg: `No intern apply for this college: ${college} `})}
        const interns =[]

        for (let i=0; i<interName.length;i++)
        {
            let Object={}
            Object._id = interName[i]._id
            Object.name=interName[i].name
            Object.email = interName[i].email
            Object.mobile=interName[i].mobile
            interns.push(Object)
        }

        const ObjectData = {
            name:college[0].name,
            fullName:college[0].fullName,
            logoLink:college[0].logoLink,
            interns:interns
        }
        
      return res.status(201).send({ status: true, count : interns.length, msg:ObjectData })

  
}
catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}
  











module.exports.collegeDetails=collegeDetails
module.exports.createCollege_Doc = createCollege_Doc



// isDeletedAt, isDeleted ,move college controller , modified 2 api output