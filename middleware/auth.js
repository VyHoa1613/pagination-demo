var db = require("../db");
var md5 = require('md5');
module.exports.auth = (req, res, next) =>{
    console.log(req.cookies, req.signedCookies)
    if(!req.signedCookies.userId)
    {
        res.redirect("/login");
        return;
    }
    var user = db.get("users").find({id:req.signedCookies.userId}).value();
    
    if(!user)
    {
       
        res.redirect("/login");
        return;s
    }
    res.locals.user = user;
    next();
}