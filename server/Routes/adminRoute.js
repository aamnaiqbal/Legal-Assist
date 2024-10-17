const express= require('express');
const adminController=require('../Controllers/adminController')

const router= express.Router();

router.route('/signup').post(adminController.signup)

module.exports= router;