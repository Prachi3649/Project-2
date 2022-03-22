const express = require('express');
const router = express.Router();
const internController =require("../controllers/internController")

const collegeController = require('../controllers/collegeController')


router.post('/functionup/colleges', collegeController.createCollege_Doc)

router.post('/functionup/interns', internController.internsEntry )

router.get('/functionup/collegeDetails', collegeController.collegeDetails)

router.get("*", async function (req,res){
    return res.status(404).send("ERROR! page not found")
})


module.exports = router;