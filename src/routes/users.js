const express=require('express');
const router= express.Router();
const registerValidations=  require('../validation/registerValidation');
const loginValidations=  require('../validation/loginValidations');
const upUserCheck=require('../middlewares/upUserCheck');
const upGuestCheck=require('../middlewares/upGuestCheck');
const {userLogin,processLogin,userRegister,processRegister, logout,profile}= require('../controllers/usersController');

router.get('/login', upGuestCheck, userLogin)
router.post('/login', loginValidations, processLogin)
router.get('/logout', logout)
router.get('/register', upGuestCheck, userRegister)
router.post('/register', registerValidations, processRegister)
router.get('/profile',profile)

module.exports= router