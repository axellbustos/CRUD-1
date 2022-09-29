module.exports=(req,res,next)=> {
    if(req.cookies.remember){
        req.session.login = req.cookies.remember
    }
    next()
}