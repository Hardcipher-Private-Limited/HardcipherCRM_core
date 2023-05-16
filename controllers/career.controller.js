const website_model = require("../models/website.model");
const { file_upload, fileFilter } = require("../helper/aws");

//add career in website
exports.add_career = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });
    if (!website_found) {
      return res
        .status(400)
        .json({ status: false, message: "website not found" });
    }
    let files = req.files;
    if (!files || files.length == 0) {
      return res.status(400).send({ status: false, msg: "No file found" });
    }
    if (files[0].mimetype !== "application/pdf") {
      return res
        .status(400)
        .json({ status: false, msg: "File type should be pdf" });
    }
    if (files.size > 3000000) {
      return res
        .status(400)
        .json({ status: false, msg: "File size should be less than 3MB" });
    }
   const uploaded_resume_url = await file_upload(files[0]);
    let { name, phone, email, resume, message } = req.body;

    req.body = uploaded_resume_url;
    
    let career_data = {
      name,
      phone,
      email,
      resume: uploaded_resume_url,
      message,
    };
    website_found.career.push(career_data);
    await website_found.save();
    res.status(201).json({
      status: true,
      message: "career added",
      data: website_found.career,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "career not added", error: err.message });
  }
};

//get career
exports.get_career = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.params.web_id,
    });

    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }
    let index = website_found.career.findIndex(
      (index) => index._id.toString() === req.params.id
    );

    res.status(200).json({
      status: true,
      message: "career found",
      data: website_found.career[index],
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "career not found", error: err.message });
  }
};

//update career
exports.update_career = async (req, res) => {
  try {
    let website_found = await website_model.findOne({
      web_id: req.body.web_id,
    });

    if (!website_found) {
      return res
        .status(404)
        .json({ status: false, message: "website not found" });
    }
    let index = website_found.career.findIndex(
      (index) => index._id.toString() === req.params.id
    );
    if (index == -1) {
      return res
        .status(404)
        .json({ status: false, message: "career not found" });
    }
    let files = req.files;
    let updated_resume_URL = await file_upload(files[0]);
    let updated_career = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      resume: updated_resume_URL,
      message: req.body.message,
    };
    website_found.career[index] = updated_career;

    await website_found.save();
    res.status(200).json({
      status: true,
      message: "career updated",
      data: website_found.career[index],
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "career not updated",
      error: err.message,
    });
  }
};
