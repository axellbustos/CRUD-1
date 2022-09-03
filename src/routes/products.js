// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload=require('../middlewares/uploadFiles')//Multer Require
const productsValidations=require('../validation/productsValidations')//Validations Require
const productsController = require('../controllers/productsController');//Controller Require

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create',upload.array('images'),productsValidations, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/update/:id',upload.array('images'),productsValidations, productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
