
var db = require("../db");
var shortid = require('shortid')

module.exports.index = (req, res) => {
    res.render("books/book", {
        books:db.get("books").value()
    })
}

module.exports.getCreateBook =  (req, res) => {
    res.render("books/create");
}

module.exports.postCreateBook = (req, res) => {
    req.body.id = shortid.generate();
    db.get("books").push(req.body).write();
    res.redirect("/books");
}

module.exports.deleteBook = (req, res) =>{
    var id = req.params.id;
    db.get("books").remove({id: id}).write();
    res.redirect("back");
}
module.exports.getUpdateBook = (req, res) => {
    var id = req.params.id;
    var book = db.get("books").find({id: id}).value();
    res.render("books/update",{
        book:book
    })
}

module.exports.postUpdateBook = (req, res) => {
    var id = req.body.id;
    db.get("books").find({id: id}).assign({title: req.body.title, description: req.body.description}).write();
    res.redirect("/books");
 }