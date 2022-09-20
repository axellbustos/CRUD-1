const express=require('express');
const router= express.Router();
const registerValidations=  require('../validation/registerValidation');
const loginValidations=  require('../validation/loginValidations');
const usersCheck=require('../middlewares/usersCheck');
const {userLogin,processLogin,userRegister,processRegister}= require('../controllers/usersController');

router.get('/login',userLogin)
router.post('/login', loginValidations, processLogin)
router.get('/register',userRegister)
router.post('/register', registerValidations, processRegister)

module.exports= router