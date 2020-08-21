var express = require('express')
var router = express.Router()

var controller = require("../controllers/controller.login")

router.get("/", controller.getLogin)
router.post("/",controller.postLogin)

module.exports = router;