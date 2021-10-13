const { checkSecret, getSecret } = require("../controllers/getSecret.js");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.query.id) return res.redirect("/");
    const data = await checkSecret(req.query.id);
    if (data.error) {
        return res.render("error", { error: data.error });
    }
    res.render("secret", data);
});

router.post("/", async (req, res) => {
    if (!req.body.id) return res.redirect("/");
    const secret = await getSecret(req.body);
    res.json(secret);
});

module.exports = router;
