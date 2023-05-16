const website_model = require("../models/website.model");
const validator = require("express-validator");

//add pages
exports.add_page = async (req, res) => {
  try {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: false, message: "validation error", error: errors });
    }
    let website_found = await website_model.findOne({
      web_id: req.body.web_id,
    });
    console.log(website_found);
    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }

    website_found.pages.push(req.body);
    await website_found.save();
    res.status(200).json({
      status: true,
      message: "page added",
      data: website_found.pages,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "page not added", error: err.message });
  }
};

//get pages
exports.get_page = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });

    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }
    let index = website_found.pages.findIndex(
      (index) => index._id.toString() === req.params.id
    );

    res.status(200).json({
      status: true,
      message: "page found",
      data: website_found.pages[index],
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "page not found", error: err.message });
  }
};

//update pages
exports.update_page = async (req, res) => {
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
  let index = website_found.pages.findIndex(
    (index) => index._id.toString() === req.params.id
  );

  website_found.pages[index] = req.body;
  await website_found.save();
  res
    .status(200)
    .json({ status: true, message: "page updated", data: website_found.pages });
};

//delete pages
exports.delete_page = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });

    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }
    let index = website_found.pages.findIndex(
      (index) => index._id.toString() === req.params.id
    );
    console.log(index);
    website_found.pages.splice(index, 1);
    await website_found.save();
    res.status(200).json({
      status: true,
      message: "page deleted",
      data: website_found.pages,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "page not deleted", error: err.message });
  }
};

//insert section
exports.insert_section = async (req, res) => {
  try {
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
    let index = website_found.pages.findIndex(
      (index) => index._id.toString() === req.params.id
    );
    let insert_sec = {
      name: req.body.section[index].name,
      title: req.body.section[index].title,
      sub_title: req.body.section[index].sub_title,
      description: req.body.section[index].description,
    };
    website_found.pages[index].section.push(insert_sec);
    await website_found.save();
    res.status(200).json({
      status: true,
      message: "section added",
      data: website_found.pages[index].section,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "section not added",
      error: err.message,
    });
  }
};

//update section
exports.update_section = async (req, res) => {
  try {
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
    let page_index = website_found.pages.findIndex(
      (index) => index._id.toString() === req.body.page_id
    );

    let sec_index = website_found.pages[page_index].section.findIndex(
      (index) => index._id.toString() === req.params.id
    );

    let update_section = {
      name: req.body.section.name,
      title: req.body.section.title,
      sub_title: req.body.section.sub_title,
      description: req.body.section.description,
    };
    website_found.pages[page_index].section[sec_index] = update_section; //req.body.section;
    await website_found.save();
    res.status(200).json({
      status: true,
      message: "section updated",
      data: website_found.pages[page_index].section[sec_index],
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "section not updated",
      error: err.message,
    });
  }
};

//get section
exports.get_section = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.body.web_id,
    });

    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }
    let page_index = website_found.pages.findIndex(
      (index) => index._id.toString() === req.body.page_id
    );
    let sec_index = website_found.pages[page_index].section.findIndex(
      (index) => index._id.toString() === req.params.id
    );
    res.status(200).json({
      status: true,
      message: "section found",
      data: website_found.pages[page_index].section[sec_index],
    });
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        message: "section not found",
        error: err.message,
      });
  }
};
