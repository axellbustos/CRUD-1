const { check } = require('express-validator');
const fs=require('fs')
const path=require("path");
const loadUsers=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/usersDB.json'), 'utf-8'));
module.exports = [
    check('email')
        .notEmpty().withMessage('este campo no puede quedar vacio').bail()
        .isEmail().withMessage('debe colocar un email'),

    check('password')
        .notEmpty().withMessage('este campo no puede quedar vacio').bail()
        .custom((value,{req})=>{
            let user=loadUsers().find(user=>user.email === req.body.email)
        })
        
]