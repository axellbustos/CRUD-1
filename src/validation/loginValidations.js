const {check} = require('express-validator');
const {loadUsers}=require('../data/moduleDB')
const bcryptjs = require('bcryptjs');
module.exports = [
    check('email')
        .notEmpty().withMessage('este campo no puede quedar vacio').bail()
        .isEmail().withMessage('debe colocar un email'),

    check('password')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isLength({
            min: 8,
            max: 64
        }).withMessage('La contraseña debe contener entre 8 y 64 caracteres')
        .custom((value,{req})=>{
            const user=loadUsers().find(user=> user.email === req.body.email && bcryptjs.compareSync(value, user.password))
            return user ? true : false
        }).withMessage('El usuario o la contraseña son erroneos'),
]