const express = require("express");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.route("/").get(teamController.getAllTeams);

router.route("/:id").get(teamController.getTeam);

router.route("/:id").patch(teamController.updateTeams);

router.route("/").post(teamController.postTeams);

router.route("/:id").delete(teamController.deleteTeams);

module.exports = router;
