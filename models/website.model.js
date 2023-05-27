const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const websiteSchema = new Schema(
  {
    web_id: {
      type: String,
      default: () => "HCWEB" + Math.floor(10000 + Math.random() * 90000),
      unique: true,
    },
    website_name: { type: String, required: true, unique: true },
    domain_name: { type: String, required: true, unique: true },
    in_company: { type: Boolean, required: true },
    brand_id:{type:Object},
    pages: [
      {
        name: { type: String, required: false },
        meta_data: { type: String, required: false },
        meta_deta_description: { type: String, required: false },
        section: [
          {
            name: { type: String, required: false },
            title: { type: String, required: false },
            sub_title: { type: String, required: false },
            description: { type: String, required: false },
          },
        ],
      },
    ],
    blogs: [
      {
        meta_deta_description: { type: String, required: false },
        title: { type: String, required: false },

        home_page: { type: Boolean, default: false },

        image: { type: String, required: false },
        url: { type: String, required: false, unique: true },
        description: { type: String, required: false },
      },
    ],
    contact_us: [
      {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        message: { type: String, required: false },
        subject: { type: String, required: false },
        status: { type: String, default: "not contacted" },
      },
    ],
    newsletter: [
      {
        email: { type: String, required: false },
        status: { type: Boolean, default: false },
      },
    ],
    career: [
      {
        name: { type: String, required: false },
        phone: { type: String, required: false },
        email: { type: String, required: false },
        resume: { type: String, required: false },
        message: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("website", websiteSchema);
