//Multer: subir archivos
const multer= require('multer');
const path =require('path');

const storage= multer.diskStorage({
    //Destino donde se guardan los archivos
    destination:(req, file, callback)=>{
        callback(null,'./public/images/products')
    },
    //Nombre del archivo 
    filename:(req,file ,callback)=>{
        callback(null, `product-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({
    storage
})
module.exports = upload