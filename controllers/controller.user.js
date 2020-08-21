var db = require("../db");
var shortid = require('shortid')
var md5 = require('md5');
var bcrypt = require('bcrypt');


module.exports.indexUser = (req, res) =>{
    res.render("users/user",{
        users:db.get("users").value()
    })
}

module.exports.getCreateUser = (req, res) => {
    res.render("users/create");
}

module.exports.postCreateUser =  (req, res) => {
    req.body.id = shortid.generate();
    var saltRounds = 10;
    var myPlaintextPassword = req.body.password;
    var a = bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                // Store hash in your password DB.   
                req.body.password = hash;
                 db.get("users").push(req.body).write();
                res.redirect("/users");
            });
        });

}

module.exports.deleteUser = (req, res) =>{
    var id = req.params.id;
    db.get("users").remove({id:id}).write();
    res.redirect("back");
}

module.exports.getUpdateUser = (req, res) => {
    var id = req.params.id;
    var user =  db.get("users").find({id:id}).value();
    res.render("users/update", {
        user:user
    })
}

module.exports.postUpdateUser = (req, res) => {
    var id = req.body.id;
    db.get("users").find({id:id}).assign({name: req.body.name}).write();
    res.redirect("/users");
}