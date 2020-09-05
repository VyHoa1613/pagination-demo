require('dotenv').config();
var express = require('express')
var router = express.Router()
var multer  = require('multer')


var upload = multer({ dest: './uploads/' })
var controller = require("../controllers/controller.user")
var validate =  require("../middleware/users.validate")

router.get("/",controller.indexUser)

router.get("/create",controller.getCreateUser)

router.post("/create",
upload.single("avatar"),
validate.postCreateUsers,
 controller.postCreateUser)

router.get("/:id/delete",controller.deleteUser)

router.get("/:id/update",controller.getUpdateUser)

router.post("/update",
upload.single("avatar"),
controller.postUpdateUser)

module.exports = router;