const Therapie = require("./../models/therapieModel");
const factory = require("./handlerFactory");

exports.getAllTherapies = factory.getAll(Therapie);

exports.getTherapy = factory.getIndividual(Therapie);

exports.postTherapies = factory.postData(Therapie);

exports.updateTherapies = factory.updateData(Therapie);

exports.deleteTherapies = factory.deleteData(Therapie);
