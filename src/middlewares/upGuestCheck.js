module.exports = (req, res, next) => req.session.login === undefined ? next() : res.redirect('/');