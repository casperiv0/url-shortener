const api = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Url = require("../models/Url.model.js");

// /api/slug/_slug_
api.get("/slug/:slug", async (req, res) => {
  const { slug } = req.params;

  if (!slug) return;

  const url = await Url.findOne({ slug }).catch((e) => console.log(e));

  if (!url) return res.json({ msg: "Not Found", status: 204 });

  // update clicks
  url.clicks += 1;
  url.save();

  return res.json({ url, status: "success" });
});

// /api/
api.post("/", async (req, res) => {
  let { full, slug } = req.body;

  if (full) {
    // check if slug is already in use
    const url = await Url.findOne({ slug }).catch((e) => console.log(e));
    if (url) {
      return res.json({ msg: "Slug is already in use!", status: 204 });
    }

    // create a slug if non was provided
    if (!slug) {
      slug = uuidv4(8);
    }

    const newUrl = new Url({ full, slug });

    newUrl
      .save()
      .then((url) => {
        return res.json({ msg: "Added", status: 200, url });
      })
      .catch((e) => console.log(e));
  } else {
    return res.json({ msg: "Full URL is required!", status: 204 });
  }
});

module.exports = api;
