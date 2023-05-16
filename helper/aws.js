const website_model = require("../models/website.model");
const validator = require("express-validator");
const multer = require("multer");
const aws = require("aws-sdk");
//const AWS=require('@aws-sdk/client-s3')
const fs = require("fs");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

let file_upload = async (file) => {
  return new Promise(function (resolve, reject) {
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });
    var uploadParams = {
      ACL: "public-read",
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "Hardcipher/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      return resolve(data.Location);
    });
  });
};

module.exports = { file_upload };
