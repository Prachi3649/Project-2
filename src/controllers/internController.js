const internModel =require("../models/internModel")
const collegeModel =require("../models/collegeModel")

const internsName = async function (req, res) {
    try {
      const { name, email, mobile, collegeName } = req.body
      if (!name) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid name" })
      }
      if (!email) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid email" })
      }
      if (!mobile) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid mobile" })
      }
      if (!collegeName) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid collegeName" })
      }
      
      const college =await collegeModel.find({fullName:collegeName})
      if (!college) {
        return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
      }
      
      req.body.collegeId = college[0]._id
      delete req.body["collegeName"]
      
        const interName = await internModel.create(req.body)
      return res.status(201).send({ status: true, msg: interName })
  
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  } 


  const collegeDetails =async function(req, res){
      try{
         const collegeName = req.query.collegeName

         const college =await collegeModel.find({ name:collegeName })
         if (!college) {
            return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
          }
           console.log(college)
          const collegeId = college[0]._id
        //   delete req.body["collegeName"]
          
            const interName = await internModel.find({collegeId: collegeId})
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
            
          return res.status(201).send({ status: true, msg:ObjectData })

      
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
      

        


      
  }


  module.exports.internsName = internsName
  module.exports.collegeDetails=collegeDetails