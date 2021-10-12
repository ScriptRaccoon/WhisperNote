const { submitSecret } = require("../controllers/submitSecret.js");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("create");
});

router.post("/", async (req, res) => {
    if (!req.body) return res.redirect("/");
    const response = await submitSecret(req.body);
    res.json(response);
});

module.exports = router;
