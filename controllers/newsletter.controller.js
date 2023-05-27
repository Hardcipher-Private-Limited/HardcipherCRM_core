const website_model = require("../models/website.model");
const validator = require("express-validator");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

//add nwesletter
exports.add_newsletter = async (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ status: false, message: "validation error", error: errors });
  }

  let website_found = await website_model.findOne({
    web_id: req.body.web_id,
  });
  //console.log(website_found)
  if (!website_found) {
    return res
      .status(404)
      .json({ status: false, message: "website not found" });
  }

  for (let i = 0; i < website_found.newsletter.length; i++) {
    if (website_found.newsletter[i].email === req.body.email) {
      return res
        .status(400)
        .json({ status: false, message: "Newsletter already subscribed" });
    }
  }

  website_found.newsletter.push({ email: req.body.email, status: true });
  await website_found.save();
  res.status(200).json({
    status: true,
    message: "newsletter added",
    data: website_found.newsletter,
  });
};

//unsubscribe
exports.unsubscribe_newsletter = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });
    console.log(website_found);
    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }
    let index = website_found.newsletter.findIndex(
      (index) => index._id.toString() === req.query.id
    );
    console.log(index);
    if (index === -1) {
      return res
        .status(404)
        .json({ status: false, message: "newsletter not found" });
    }
    website_found.newsletter[index].status = false;
    await website_found.save();
    res.status(200).json({
      status: true,
      message: "newsletter unsubscribed",
      data: website_found.newsletter[index],
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "newsletter not unsubscribed",
      error: err.message,
    });
  }
};

//get newsletter
exports.get_newsletter = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });
    console.log(website_found);
    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }
    let index = website_found.newsletter.findIndex(
      (index) => index._id.toString() === req.params.id
    );
    console.log(index);
    res.status(200).json({
      status: true,
      message: "newsletter found",
      data: website_found.newsletter[index],
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "newsletter not found",
      error: err.message,
    });
  }
};

//update newsletter
exports.update_newsletter = async (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ status: false, message: "validation error", error: errors });
  }

  let website_found = await website_model.findOne({
    web_id: req.body.web_id,
  });
  if (!website_found) {
    return res
      .status(404)
      .json({ status: false, message: "website not found" });
  }
  let index = website_found.newsletter.findIndex(
    (index) => index._id.toString() === req.params.id
  );
  if (index === -1) {
    return res
      .status(404)
      .json({ status: false, message: "newsletter not found" });
  }
  website_found.newsletter[index].email = req.body.email;
  await website_found.save();
  res.status(200).json({
    status: true,
    message: "newsletter updated",
    data: website_found.newsletter[index],
  });
};
