const Ivdrip = require("./../models/ivdripModel");
const factory = require("./handlerFactory");

exports.getAllIvdrips = factory.getAll(Ivdrip);

exports.getIvdrip = factory.getIndividual(Ivdrip);

exports.postIvDrip = factory.postData(Ivdrip);

exports.updateIvDrip = factory.updateData(Ivdrip);

exports.deleteIvDrip = factory.deleteData(Ivdrip);
