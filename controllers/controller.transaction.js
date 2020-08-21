var db = require("../db");
var shortid = require('shortid')

module.exports.indexTransaction = (req, res) =>{
    var usersTran = db.get("transaction").value();
    console.log(usersTran)
    var takeUser =usersTran.map(function(item){
        return{
            user: db.get("users").find({id:item.userId}).value().name,
            book: db.get("books").find({id:item.bookId}).value().title,
            id: db.get("transaction").find({id:item.id}).value().id,
            isComplete: db.get("transaction").find({id:item.id}).value().isComplete
        }
    })
    console.log(takeUser);
    res.render("transaction/borrow",{
        borrows:takeUser
    })
}

module.exports.getCreateTransaction = (req, res)=> {
    res.render("transaction/create",{
        users:db.get("users").value(),
        books:db.get("books").value()
    });
    
}

module.exports.postCreateTransaction = (req, res)=> {
    req.body.id = shortid.generate();
    console.log(req.body)
    db.get("transaction").push(req.body).write();
    res.redirect("/transaction");
}

module.exports.getViewTransaction = (req, res)  =>{
    var id = req.params.id;
    var tran = db.get("transaction").find({id: id}).value();
    res.render("transaction/view",{
        tran:tran
    })
}

module.exports.postViewTransaction = (req, res) =>{
    var id = req.body.id;
    db.get("transaction").find({id:id}).assign({isComplete: req.body.isComplete}).write();
    res.redirect("/transaction");
}