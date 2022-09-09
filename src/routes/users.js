const express=require('express');
const router= express.Router();
const userValidations=  require('../validation/usersValidation');
const usersCheck=require('../middlewares/usersCheck')
const {userLogin,processLogin}= require('../controllers/usersController');

router.get('/login',userLogin),
router.post('/login', userValidations, processLogin)

module.exports= router