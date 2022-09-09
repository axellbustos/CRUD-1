const fs = require('fs');
const path = require('path');

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/usersDB.json'), 'utf-8'));

module.exports=(req,res,next)=>{
    if (users.includes(req.query.user.toLowerCase())){
        return next()
    }else{ 
        return res.redirect('/loged?error=true')
    }
}