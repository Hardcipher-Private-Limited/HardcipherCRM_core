const user_model = require("../models/user.model");
const validator = require("express-validator");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const utility = require("../helper/utility");


exports.register_user = async (req, res) => {
  try {
    const error = validator.validationResult(req);
    if (!error.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: error });
    }

    // let personal_email_found = await user_model.findOne({ personal_email: req.body.personal_email })
    // if (personal_email_found) {
    //   return res.status(400).json({ status: false, message: "personal email already exist" })
    // }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt);
    const user = new user_model({
      emp_name: req.body.emp_name,
      personal_email: req.body.personal_email,
      password: hashed_password,
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

//create login
exports.login_user = async (req, res) => {
  try {
    const error = validator.validationResult(req);
    if (!error.isEmpty()) {

      res
        .status(400)
        .json({ status: false, message: "validation error", error: error });
    }
    //check if user exist
    let user_found = await user_model.findOne({
      personal_email: req.body.personal_email,
    });
    console.log("line  66---",user_found)
    if (!user_found) {
      return res
        .status(400)
        .json({ status: false, message: "user not found" });
    }

    console.log("line  73---",req.body.password,user_found.password)
    //check password
    const valid_password = await bcrypt.compare(
      req.body.password,
      user_found.password
    );
    console.log("line 79----",valid_password)
    if (!valid_password) {
      return res
        .status(400)
        .json({ status: false, message: "invalid password" });
    }
    //Generated JWT token with Payload and secret.
  
    const jwtPayload = {
      id: user_found._id.toString(),
      role: user_found.role,
      emp_name: user_found.emp_name,
    }
    //create jwt token and send to bearer token in authorization
    //iat: Math.floor(Date.now() / 1000) 
    const token = JWT.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_TIME 
      }

    )
    //send jwt token in authorization
    res.setHeader('authorization', token)
    res.status(200).json({ status: true, message: "login success", data: { token: token } });

    


  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "user not logged in", error: err.message });
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
