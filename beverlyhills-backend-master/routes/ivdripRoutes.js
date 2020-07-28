const express = require("express");
const ivdripController = require("../controllers/ivdripController");

const router = express.Router();

router.route("/").get(ivdripController.getAllIvdrips);

router.route("/:id").get(ivdripController.getIvdrip);

router.route("/:id").patch(ivdripController.updateIvDrip);

router.route("/").post(ivdripController.postIvDrip);

router.route("/:id").delete(ivdripController.deleteIvDrip);

module.exports = router;
