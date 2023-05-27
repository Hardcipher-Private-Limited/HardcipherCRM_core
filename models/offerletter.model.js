//create offerletter schema
const mongoose = require("mongoose");
const Object = new mongoose.Types.ObjectId();
const offerletterSchema = new mongoose. Schema(
  {
    offerletterId: {
      type: String,
      default: () => `HCOL${Math.floor(10000 + Math.random() * 90000)}`,
      unique: true,
    },
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    designation: { type: String, required: false },
    department: { type: String, required: false },
    joining_date: { type: String, required: false },
    salary_structure: { type: String, required: false },
    offer_date: { type: String, required: false },
    validity: { type: String, required: false },
    managirial_approval: { type: Boolean, default: false },
    dertmental_approval: { type: Boolean, default: false },
    sent: { type: Boolean, default: false },
    created_by: { type: String, required: false },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("offerletter", offerletterSchema);
