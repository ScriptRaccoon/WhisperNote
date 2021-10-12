const createSecret = require("../controllers/createSecret.js");

const express = require("express");
const { json } = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("create");
});

router.post("/", async (req, res) => {
    if (!req.body) return res.redirect("/");
    const secret = await createSecret(req.body);
    res.json(secret);
});

module.exports = router;
