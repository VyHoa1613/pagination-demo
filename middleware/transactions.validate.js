var db = require("../db");
var shortid = require('shortid')
module.exports.getViewTransaction = (req, res, next) =>{
    var id = req.params.id;
    var idInTran = db.get("transaction").find({id:id}).value();
    var errors = []
    if(!idInTran)
    {
        errors.push("id not correct");
        var usersTran = db.get("transaction").value();
        var takeUser =usersTran.map(function(item){
        return{
            user: db.get("users").find({id:item.userId}).value().name,
            book: db.get("books").find({id:item.bookId}).value().title,
            id: db.get("transaction").find({id:item.id}).value().id,
            isComplete: db.get("transaction").find({id:item.id}).value().isComplete
            }
        })
        res.render("transaction/borrow",{
            borrows:takeUser,
            errors:errors
            })
        return;
    }
    next();
}