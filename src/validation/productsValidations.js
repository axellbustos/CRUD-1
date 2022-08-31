// Se requiere el atributo check de express-validator //
const { check } = require('express-validator');

//VALIDACIONES//
module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()//.bail() no sigue validando si no se cumple
        .isLength({min:4}).withMessage('debe escribir al menos 4 caracteres'),

    check('price')
        .notEmpty().withMessage('el precio es obligatorio').bail()
        .isNumeric({no_symbols:true}).withMessage('el precio debe ser un numero'),//no acepta simbolos que no sean numericos

    check('discount')
        .isNumeric({no_symbols:true}).withMessage('el descuento debe ser un numero')
        .isInt({max:99}).withMessage('el descuento maximo es 99'),//.isInt() valor minimo o maximo

    check('category')
        .notEmpty().withMessage('la categoria es obligatoria').bail()
]