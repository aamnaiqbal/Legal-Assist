const express= require('express');
const adminController=require('../Controllers/lawyerController')

const router= express.Router();

router.route('/signup').post(adminController.signup)
router.route('/login').post(adminController.login)

module.exports= router;