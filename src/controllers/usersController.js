const fs=require("fs");
const path=require("path");
const loadUsers=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/usersDB.json'), 'utf-8'));
const {validationResult}=require('express-validator')


module.exports={
    userLogin:(req, res)=>{
        return res.render('login',{
            msg:req.query.error ? 'No tienes los privilegios para ingresar':null
        })
    },
    processLogin:(req, res)=>{
        return res.send(req.body)
        /*const errors=validationResult(req)
        if(errors.notEmpty()){
            res.redirect('index',{
            user:req.query.user
        })
        }else{
            return res.render('login')
        }*/
        
    }
}