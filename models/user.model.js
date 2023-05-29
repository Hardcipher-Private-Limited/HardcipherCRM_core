//create user model

const mongoose = require("mongoose");
const Object = new mongoose.Types.ObjectId();
const utility = require("../helper/utility");

const userSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      default: () =>
        `HCEI${new Date()
          .getFullYear()
          .toString()
          .slice(2)}${new Date().getDate()}${new Date().getMonth() + 1
        }${utility.generateSerialNumber()}`,
      unique: true,
    },
    emp_name: { type: String, required: true },
    user_type: {
      type: String,
      required: true,
      enum: [
        "Director", 
        "Manager", 
        "Executive", 
        "Junior Executive",
         "Intern"
        ],
      default: "user",
    },
    personal_email: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    official_email: { type: String, required: false },
    joining_date: { type: Date, required: true },
    designation: { type: String, required: false },
    department: { type: String, required: false },
    brand: { type: String, required: false },
    attendance: [
      {
        month: {
          type: String,
          enum: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          required: true,
        },
        year: {
          type: Number,
          default: () => {
            new Date().getFullYear();
          },
        },
        dates: [{ type: String, required: false }],
      },
    ],
    salary_structure: {
      ctc: { type: Number, required: false },
      basic: { type: Number, required: false },
      hra: { type: Number, required: false },
      convence: { type: Number, required: false },
      medical: { type: Number, required: false },
      special_allowence: { type: Number, required: false },
      net_salary: { type: Number, required: false },
      emp_pf: { type: String, required: false },
      emp_esi: { type: Number, required: false },
      emp_gratuaty: { type: Number, required: false },
      profesional_tax: { type: Number, required: false },
      gross_salary: { type: Number, required: false },
      employer_pf: { type: String, required: false },
      employer_esi: { type: Number, required: false },
    },
    salary: [
      {
        month: {
          type: String,
          enum: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          required: true,
        },
        year: { type: Number, default: () => `${new Date().getFullYear()}` },
        total_salary: { type: Number, required: false },
        salary_slip_issued: { type: Boolean, default: false },
      },
    ],
    bank_details: {
      acc_number: { type: Number, required: false },
      ifsc_code: { type: String, required: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); //users
