const express = require("express");
const therapieController = require("../controllers/therapieController");

const router = express.Router();

router.route("/").get(therapieController.getAllTherapies);

router.route("/:id").get(therapieController.getTherapy);

router.route("/:id").patch(therapieController.updateTherapies);

router.route("/").post(therapieController.postTherapies);

router.route("/:id").delete(therapieController.deleteTherapies);

module.exports = router;
