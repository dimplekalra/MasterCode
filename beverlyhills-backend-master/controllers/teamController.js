const Team = require("./../models/teamModel");
const factory = require("./handlerFactory");

exports.getAllTeams = factory.getAll(Team);

exports.getTeam = factory.getIndividual(Team);

exports.postTeams = factory.postData(Team);

exports.updateTeams = factory.updateData(Team);

exports.deleteTeams = factory.deleteData(Team);
