const { json } = require("body-parser");
const website_model = require("../models/website.model");
const validator = require("express-validator");

//add blog
exports.add_blog = async (req, res) => {
  try {
    //validations
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    // check website in DB
    let website_found = await website_model.findOne({ id: req.body.id });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }

    //push blog in website
    website_found.blogs.push(req.body);
    await website_found.save();
    res
      .status(200)
      .json({ status: true, message: "blog added", data: website_found.blogs });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "blog not added", error: err.message });
  }
};

exports.update_blog = async (req, res) => {
  try {
    //validation
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    //update blog data in website

    let website_found = await website_model.findOne({ id: req.body.id });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }

    let blog_index = website_found.blogs.findIndex(
      (blog) => blog._id.toString() === req.params.id
    );
    console.log("59 line", blog_index);

    if (blog_index == -1) {
      return res.status(400).json({ status: false, message: "blog not found" });
    }
    website_found.blogs[blog_index] = req.body;
    await website_found.save();
    res.status(200).json({
      status: true,
      message: "blog updated",
      data: website_found.blogs,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "blog not updated", error: err.message });
  }
};

//delete blog
exports.delete_blog = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }

    let blog_index = website_found.blogs.findIndex(
      (blog) => blog._id.toString() === req.params.id
    );
    if (blog_index == -1) {
      return res.status(400).json({ status: false, message: "blog not found" });
    }
    let blog_deleted = website_found.blogs.splice(blog_index, 1);
    await website_found.save();

    res
      .status(200)
      .json({ status: true, message: "blog deleted", data: blog_deleted });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "blog not deleted", error: err.message });
  }
};

//fetch blog
exports.get_blog = async (req, res) => {
  try {
    //fetch blog
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }
    let blog_index = website_found.blogs.findIndex(
      (blog) => blog._id.toString() === req.params.id
    );

    res.status(200).json({
      status: true,
      message: "blog found",
      data: website_found.blogs[blog_index],
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "blog not found", error: err.message });
  }
};

//fetch all blogs
exports.get_blogs_list = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "blog found", data: website_found.blogs });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "blog not found", error: err.message });
  }
};
