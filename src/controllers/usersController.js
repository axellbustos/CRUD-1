const { loadUsers, storeUsers } = require('../data/moduleDB');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');


module.exports = {
    userRegister: (req, res) => {
        return res.render('register')
    },
    processRegister: (req, res) => {

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const { firstName, email, password } = req.body;
            const users = loadUsers();

            const newUser = {
                ...req.body,
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                firstName: firstName.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password.trim(), 10)
            };

            const usersModify = [...users, newUser];

            storeUsers(usersModify);
            return res.redirect("/");
        } else {
            return res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    userLogin: (req, res) => {
        return res.render('login')
    },
    processLogin: (req, res) => {

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            let {id, firstName}= loadUsers().find(user=> user.email === req.body.email);
            req.session.login ={
                id, 
                firstName
            }
            if(req.body.remember != undefined){
                res.cookie('remember', req.session.login, {maxAge: 600000})
            }
            return res.redirect('/')
        } else {
            
            return res.render('login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    profile: (req, res) => {
        let user = loadUsers().find(user => user.id === +req.session.login.id);
        
        return res.render('profile', {
            user
        });
    },
    logout: (req, res)=>{
        req.session.destroy()

        return res.redirect('/')
    }
}