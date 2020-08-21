require('dotenv').config();
var express = require('express')
var cookieParser = require('cookie-parser')
var md5 = require('md5');
var app = express()
var port = 3000
console.log(process.env.SENDGRID_API_KEY);

var booksRouter = require("./Routes/books.route");
var usersRouter = require("./Routes/users.route");
var transactionRouter = require("./Routes/transaction.route");
var loginRouter = require("./Routes/login.route")

var authAdmin = require("./middleware/authAdmin")

var auth = require("./middleware/auth")

app.use(cookieParser("aiuasdnajsd"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views','./views');

// Set some defaults (required if your JSON file is empty)
app.use(express.static('public'))
app.use("/login",loginRouter);
app.use("/books",auth.auth,authAdmin.authAdmin,booksRouter);



// Users
app.use("/users",auth.auth,authAdmin.authAdmin,usersRouter);
//
app.use("/transaction",auth.auth,authAdmin.authAdmin,transactionRouter);

app.listen(port, () => {
    console.log('hello book store'+ port);
  })