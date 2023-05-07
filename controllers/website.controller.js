const website_model = require("../models/website.model");
const validator = require("express-validator");
const mongoose=require('mongoose')
const ObjectId= mongoose.Types.ObjectId

// add website
exports.add_website = async (req, res) => {
  try {
    //validations
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    //check website exist or not
    let website_found = await website_model.findOne({
      website_name: req.body.website_name,
    });
    if (website_found) {
      return res.status(400).json({
        status: false,
        message: "website already exist. Plz try another website name",
      });
    }
    // website domain validation
    let regex = /^(www)\.([a-zA-Z0-9]+)\.([a-z]{2,3})$/;
    if (!regex.test(req.body.domain_name)) {
      return res.status(400).json({
        status: false,
        message: "domain name is not valid, Ex:www.xyz.com",
      });
    }
    let domain_found = await website_model.findOne({
      domain_name: req.body.domain_name,
    });
    if (domain_found) {
      return res.status(400).json({
        status: false,
        message: "domain name already exist, Plz try another domain name",
      });
    }

    //create website
    const website = new website_model({
      website_name: req.body.website_name,
      domain_name: req.body.domain_name,
      in_company: req.body.in_company,
      pages: req.body.pages,
      blogs: req.body.blogs,
      contact_us: req.body.contact_us,
      newsLetter: req.body.newsLetter,
      career: req.body.career,
    });
    //save website
    let website_created = await website.save();
    res
      .status(200)
      .json({ status: true, message: "website added", data: website_created });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "website not added",
      error: err.message,
    });
  }
};

//delete website
exports.delete_website = async (req, res) => {
  try {
   
    let website_deleted = await website_model.findOneAndDelete({web_id:req.params.web_id});
    if (!website_deleted) {
      res.status(400).json({ status: false, message: "website not found" });
    }
    res.status(200).json({
      status: true,
      message: "website deleted",
      data: website_deleted,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "website not deleted", error: err.message });
  }
};

//Get website
exports.get_website = async (req, res) => {
  try {
    //get website
  
    let website = await website_model.findOne({web_id:req.params.web_id});
    if (!website) {
      res.status(404).json({ status: false, message: "website not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "website found", data: website });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "website not found", error: err });
  }
};
