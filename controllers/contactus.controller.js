const website_model = require("../models/website.model");
const validator = require("express-validator");

//add contact us
exports.add_contactus = async (req, res) => {
  try {
    //validation
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    //check website in DB
    let website_found = await website_model.findOne({ id: req.body.id });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }
    //push contact us in website
    website_found.contact_us.push(req.body);
    await website_found.save();
    res
      .status(200)
      .json({
        status: true,
        message: "contact us added",
        data: website_found.contact_us,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "contact us not added",
        error: err.message,
      });
  }
};

//update contact us
exports.update_contactus = async (req, res) => {
  try {
    //validation
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    //update contact us data in website
    let website_found = await website_model.findOne({ id: req.body.id });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }
    let contactus_index = website_found.contact_us.findIndex(
      (contactus) => contactus._id.toString() === req.params.id
    );
    if (contactus_index === -1) {
      return res
        .status(400)
        .json({ status: false, message: "contact us not found" });
    }
    website_found.contact_us[contactus_index] = req.body;
    await website_found.save();
    res
      .status(200)
      .json({
        status: true,
        message: "contact us updated",
        data: website_found.contact_us,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "contact us not updated",
        error: err.message,
      });
  }
};

//get contact us
exports.get_contactus = async (req, res) => {
  try {
    //check website in DB
    let website_found = await website_model.findOne({ id: req.params.id });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }
    res
      .status(200)
      .json({
        status: true,
        message: "contact us found",
        data: website_found.contact_us,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "contact us not found",
        error: err.message,
      });
  }
};
