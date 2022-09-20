const { check, body } = require('express-validator');
const {loadUsers}=require('../data/moduleDB')
module.exports = [
    check('firstName')
    .notEmpty().withMessage('Éste campo es obligatorio').bail()
    .isLength({
        min : 4,
        max : 30
    }).withMessage('El nombre debe contener entre 4 y 30 caracteres').bail()
    .isAlpha('es-ES').withMessage('Sólo caracteres alfabéticos'),

    check('lastName')
    .notEmpty().withMessage('Éste campo es obligatorio').bail()
    .isLength({
        min : 4,
        max : 30
    }).withMessage('El nombre debe contener entre 4 y 30 caracteres').bail()
    .isAlpha('es-ES').withMessage('Sólo caracteres alfabéticos'),

    check('email')
        .notEmpty().withMessage('este campo no puede quedar vacio').bail()
        .isEmail().withMessage('debe colocar un email')
        .custom((value)=>{
            const user=loadUsers().find(user=> user.email === value)
            return user ? false :  true
        }).withMessage('Este email ya fue registrado'),

    check('password')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isLength({
            min: 8,
            max: 64
        }).withMessage('La contraseña debe contener entre 8 y 64 caracteres'),

    body('password2')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false
            }
            return true
        }).withMessage('Las contraseñas deban coincidir')
]