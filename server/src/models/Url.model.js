const { Schema, model } = require("mongoose");

const urlSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  clicks: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = model("Url", urlSchema);
