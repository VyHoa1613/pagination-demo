var express = require('express')
var router = express.Router()

var controller = require("../controllers/controller.book");


router.get("/", controller.index)

router.get("/create", controller.getCreateBook)

router.post("/create", controller.postCreateBook)

router.get("/:id/delete", controller.deleteBook)

router.get("/:id/update",controller.getUpdateBook)

router.post("/update", controller.postUpdateBook)

module.exports = router;