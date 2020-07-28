const catchAsync = require("./../utils/catchAsync");
const { Model } = require("mongoose");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    // Send Response
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.postData = (Model) =>
  catchAsync(async (req, res, next) => {
    const { title, description } = req.body;
    // console.log(req.body);

    if (!title || !description) {
      res.status(400).json({
        message: "Input can't be empty",
      });
      return res.end();
    }

    Model.find({ title: title }).exec((err, result) => {
      if (err) {
        res.status(422).json({
          message: "error is there",
        });

        return res.end();
      }

      if (result.length && result) {
        res.status(409).json({
          message: "Already existed",
          data: result,
        });

        return res.end();
      }

      new Model({
        title: title,
        description: description,
      })
        .save()
        .then((result) => {
          res.status(200).json({
            message: "successully added",
            data: result,
          });
          return res.end();
        });
    });
  });

exports.updateData = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const { InputTitle, description } = req.body;
    if (!InputTitle || !description) {
      res.status(400).json({
        message: "Input should not be blanked",
      });
      return res.end();
    }

    Model.findById({ _id: id }).exec(async (err, result) => {
      if (err) {
        // res.status(422).json({
        //   message: "Error is there in processing",
        // });
        // return res.end();
        next(err);
      }

      if (!result) {
        res.status(404).json({
          message: "does not exist",
        });
        return res.end();
      }

      await Model.findByIdAndUpdate(
        { _id: id },
        { title: InputTitle, description: description },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          // return res.status(422).json({
          //   message: "Error is there",
          // });
          next(err);
        }

        return res.status(200).json({
          message: "successfully updated",
          data: result,
        });
      });
    });
  });

exports.deleteData = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    await Model.findByIdAndRemove({ _id: id }).exec((err, result) => {
      if (err) {
        res.status(422).json({
          message: "error is there",
        });
        return res.end();
      }

      res.status(200).json({
        message: "successfully removed",
        data: result,
      });
      return res.end();
    });
  });

exports.getIndividual = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // console.log(req.params);
    await Model.findById(id).exec((err, result) => {
      if (err) {
        res.status(422).json({
          message: "error is there",
        });
        return res.end();
      }

      if (!result) {
        res.status(404).json({
          message: "not found",
        });
      }

      res.status(200).json({
        message: "success",
        data: result,
      });
    });
  });
