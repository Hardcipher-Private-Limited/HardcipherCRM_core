const user_model = require("../models/user.model");
const validator = require("express-validator");
const utility = require("../helper/utility");

exports.register_user = async (req, res) => {
  try {
    const error = validator.validationResult(req);
    if (!error.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: error });
    }

    let personal_email_found = await user_model.findOne({ personal_email: req.body.personal_email })
    if (personal_email_found) {
      return res.status(400).json({ status: false, message: "personal email already exist" })
    }

    // create user
    const user = new user_model({
      emp_name: req.body.emp_name,
      personal_email: req.body.personal_email,
      official_email: req.body.official_email,
      joining_date: req.body.joining_date,
      designation: req.body.designation,
      department: req.body.department,
      brand: req.body.brand,
      attendance: req.body.attendance,
      salary_structure: req.body.salary_structure,
      salary: req.body.salary,
      bank_details: req.body.bank_details,
    });
    // save user
    let user_created = await user.save();
    res
      .status(200)
      .json({ status: true, message: "user added", data: user_created });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "user not added", error: err.message });
  }
};



//update user
exports.update_user = async (req, res) => {
  try {
    const user_found = await user_model.findOne(req.params.id);
    if (!user_found) {
      return res.status(400).json({ status: false, message: "user not found" });
    }
    const user = {
      emp_name: req.body.emp_name,
      personal_email: req.body.personal_email,
      official_email: req.body.official_email,
      joining_date: req.body.joining_date,
      designation: req.body.designation,
      department: req.body.department,
      brand: req.body.brand,
      attendance: req.body.attendance,
      salary_structure: req.body.salary_structure,
      salary: req.body.salary,
      bank_details: req.body.bank_details,
    };
    let user_updated = await user_model.findByIdAndUpdate(req.params.id, user, {
      new: true,
    });
    res
      .status(200)
      .json({ status: true, message: "user updated", data: user_updated });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "user not updated", error: err.message });
  }
};

//get user by id
exports.get_user_by_id = async (req, res) => {
  try {
    const user_found = await user_model.findOne(req.params.id);
    if (!user_found) {
      return res.status(400).json({ status: false, message: "user not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "user found", data: user_found });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "user not found", error: err.message });
  }
};

//get all user
exports.get_all_user = async (req, res) => {
  try {
    const user_found = await user_model.find();
    if (!user_found) {
      return res.status(400).json({ status: false, message: "user not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "user found", data: user_found });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "user not found", error: err.message });
  }
};
