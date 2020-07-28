const Service = require("./../models/serviceModel");
const factory = require("./handlerFactory");

exports.getAllServices = factory.getAll(Service);

exports.getService = factory.getIndividual(Service);

exports.postService = factory.postData(Service);

exports.updateService = factory.updateData(Service);

exports.deleteService = factory.deleteData(Service);
