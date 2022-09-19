const { loadUsers, storeUsers } = require('../data/moduleDB');
const {validationResult}=require('express-validator');
const bcryptjs = require('bcryptjs');


module.exports={
    userRegister:(req, res)=>{
        return res.render('register')
    },
    processRegister:(req, res)=>{
        
        const errors=validationResult(req)
        if(errors.isEmpty()){
            const { firstName, email, password } = req.body;
            const users = loadUsers();

            const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                firstName : firstName.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password.trim(),10)
            };
            
            const usersModify = [...users, newUser];

            storeUsers(usersModify);
            return res.redirect("/");
        }else{
            return res.render('register',{
                errors : errors.mapped(),
                old : req.body})
        }
        
    },
    userLogin:(req, res)=>{
        return res.render('login',{
            msg:req.query.error ? 'No tienes los privilegios para ingresar':null
        })
    },
    processLogin:(req, res)=>{
        
        const errors=validationResult(req)
        if(errors.isEmpty()){
            res.redirect('index',{
            user:req.query.user
        })
        }else{
            return res.render('login',{
                old: errors.mapped()})
        }
        
    }
}