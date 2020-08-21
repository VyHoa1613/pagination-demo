const db = require("../db");
var md5 = require('md5');
module.exports.authAdmin = (req, res, next) =>{
    var user = db.get("users").find({id:req.signedCookies.userId}).value();
    var userTran = db.get("transaction").filter({userId: user.id}).value();
    var errors = []
    var takeUser = userTran.map(function(item) {
        return{
            user: db.get("users").find({id:item.userId}).value().name,
            book: db.get("books").find({id:item.bookId}).value().title,
            id: db.get("transaction").find({id:item.id}).value().id,
            isComplete: db.get("transaction").find({id:item.id}).value().isComplete
        }
    })
    if(!user.isAdmin)
    {
        res.render("transaction/borrow",{
            borrows:takeUser,
            errors:errors
            })
        return;
    }

    next();
}