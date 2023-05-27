//create brand model

const mongoose = require("mongoose");
const Object = new mongoose.Types.ObjectId();
const Schema = new mongoose.Schema();

const brandSchema = new mongoose.Schema(
  {
    brandId: {
      type: String,
      default: () => `HCBR${Math.floor(10000 + Math.random() * 90000)}`,
      unique: true,
    },
    name: { type: String, required: true },

    department: [
      {
        name: { type: String, required: true },
        designation: [
          {
            name: { type: String, required: true },
            level: { type: Number, required: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("brand", brandSchema);
