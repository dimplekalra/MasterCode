const express = require("express");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

router.route("/").get(serviceController.getAllServices);

router.route("/:id").get(serviceController.getService);

router.route("/:id").patch(serviceController.updateService);

router.route("/").post(serviceController.postService);

router.route("/:id").delete(serviceController.deleteService);

module.exports = router;
