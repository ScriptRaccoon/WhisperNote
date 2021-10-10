const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log("Server started on PORT", PORT));

require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { submitSecret } = require("./controllers/submitSecret.js");
const { getSecret } = require("./controllers/getSecret.js");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("main");
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    if (!req.body) return res.redirect("/");
    const response = await submitSecret(req.body);
    res.json(response);
});

app.get("/created", (req, res) => {
    const id = req.query.id;
    if (!id) return res.redirect("/");
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const url = `${baseURL}/secret?id=${id}`;
    res.render("created", { url });
});

app.get("/secret", (req, res) => {
    if (!req.query.id) return res.redirect("/");
    res.render("secret", { id: req.query.id });
});

app.post("/secret", async (req, res) => {
    if (!req.body.id) return res.redirect("/");
    const response = await getSecret(req.body.id);
    res.json(response);
});

app.use((req, res) => res.render("error", { error: "There is no such page." }));
