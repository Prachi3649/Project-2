const express = require('express');
const router = express.Router();
const internController =require("../controllers/internController")

const collegeController = require('../controllers/collegeController')


router.post('/functionup/colleges', collegeController.createCollege_Doc)

router.post('/functionup/interns', internController.internsName )

router.get('/functionup/collegeDetails', internController.collegeDetails)


module.exports = router;