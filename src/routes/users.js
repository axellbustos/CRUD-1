const express=require('express');
const router= express.Router();
const userValidations=  require('../validation/usersValidation');
const usersCheck=require('../middlewares/usersCheck')
const {userLogin,processLogin,userRegister,processRegister}= require('../controllers/usersController');

router.get('/login',userLogin),
router.post('/login', userValidations, processLogin)
router.get('/register',userRegister),
//router.post('/register', userValidations, processRegister)

module.exports= router