const { getSecret } = require("../controllers/getSecret.js");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (!req.query.id) return res.redirect("/");
    res.render("secret", { id: req.query.id });
});

router.post("/", async (req, res) => {
    if (!req.body.id) return res.redirect("/");
    const response = await getSecret(req.body.id);
    res.json(response);
});

module.exports = router;
