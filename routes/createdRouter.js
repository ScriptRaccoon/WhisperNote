const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const id = req.query.id;
    if (!id) return res.redirect("/");
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const url = `${baseURL}/secret?id=${id}`;
    const password = req.query.password;
    res.render(
        "created",
        password ? { url, hasPassword: true, password } : { url, hasPassword: false }
    );
});

module.exports = router;
