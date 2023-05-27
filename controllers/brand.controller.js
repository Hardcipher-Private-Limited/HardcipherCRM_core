const brand_model = require("../models/brand.model");
const validator = require("express-validator");

//add brand
exports.add_brand = async (req, res) => {
  try {
    //validation
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    //create brand
    let brand = await brand_model.create(req.body);
    res
      .status(200)
      .json({ status: true, message: "brand created", data: brand });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "brand not created",
        error: err.message,
      });
  }
};
//get brand
exports.get_all_brand = async (req, res) => {
  try {
    let brand = await brand_model.find();
    if (brand.length == 0) {
      return res
        .status(400)
        .json({ status: false, message: "brand not found" });
    }
    res.status(200).json({ status: true, message: "brand found", data: brand });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "brand not found", error: err.message });
  }
};
//get brand by id
exports.get_brand_by_id = async (req, res) => {
  try {
    let brand = await brand_model.findOne({ brandId: req.body.brandId });

    if (!brand) {
      return res
        .status(400)
        .json({ status: false, message: "brand not found" });
    }
    res.status(200).json({ status: true, message: "brand found", data: brand });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "brand not found", error: err.message });
  }
};
//update brand
exports.update_brand = async (req, res) => {
  try {
    //validation
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    //update brand
    let brand = await brand_model.findOneAndUpdate(
      { brandId: req.params.brandId },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "brand updated", data: brand });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "brand not updated",
        error: err.message,
      });
  }
};
