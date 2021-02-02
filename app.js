const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log("Server started on PORT", PORT));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

require("dotenv").config();

app.set("view engine", "ejs");

const { addNote, readNote, deleteNote } = require("./controllers/notes.js");

app.get("/", (req, res) => {
    res.render("main");
});

app.get("/add", (req, res) => {
    res.render("add", { error: req.query.error ? "Note could not be created" : "" });
});

app.post("/add", async (req, res) => {
    const text = req.body.text;
    if (!text) {
        res.redirect("/");
        return;
    }

    const id = await addNote(text);

    if (!id) {
        res.redirect("/add?error=1");
    } else {
        console.log("note added with id", id);
        const url = `${req.protocol}://${req.get("host")}/notes?id=${id}`;
        res.render("added", { url });
    }
});

app.get("/notes", async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.redirect("/");
        return;
    }
    const data = await readNote(id);
    if (!data) {
        res.redirect("/");
        return;
    }
    const { text } = JSON.parse(data);
    await deleteNote(id);
    console.log("note opened and destroyed with id", id);
    res.render("note", { text });
});

app.use((req, res) => res.redirect("/"));
