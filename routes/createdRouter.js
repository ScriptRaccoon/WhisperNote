const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const id = req.query.id;
    if (!id) return res.redirect("/");
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const url = `${baseURL}/secret?id=${id}`;
    res.render("created", { url });
});

module.exports = router;
