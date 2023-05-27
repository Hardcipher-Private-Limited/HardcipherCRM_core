//create offer letter API

const offer_letter_model = require("../models/offerletter.model");
const validator = require("express-validator");

exports.add_offer_letter = async (req, res) => {
  try {
    //validation
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    //create offer letter
    let offer_letter = await offer_letter_model.create(req.body);
    res
      .status(200)
      .json({
        status: true,
        message: "offer letter created",
        data: offer_letter,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "offer letter not created",
        error: err.message,
      });
  }
};

//get offer letter by id
exports.get_offer_letter_by_id = async (req, res) => {
  try {
    let offer_letter = await offer_letter_model.findOne({
      offerletterId: req.params.offerletterId,
    });
    if (!offer_letter) {
      return res
        .status(400)
        .json({ status: false, message: "offer letter not found" });
    }
    res
      .status(200)
      .json({
        status: true,
        message: "offer letter found",
        data: offer_letter,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "offer letter not found",
        error: err.message,
      });
  }
};
