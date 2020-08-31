
module.exports.postCreateUsers = (req, res, next) =>{
    
    var errors = [];
    var values = req.body;
    if(!req.body.name)
    {
        errors.push("name is required.");
    }
    if(req.body.name.length > 30)
    {
        errors.push("name must not exceed 30 characters");
    }

    if(!req.body.password)
    {
        errors.push("password is required.")
    }
    if(errors.length)
    {
        res.render("users/create",{
            errors:errors,
            values:values
        });
        return;
    }
    next();

}