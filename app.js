const { deleteExpired } = require("./controllers/expiredSecrets.js");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
    deleteExpired();
});
require("dotenv").config();

const apiLimiter = require("./controllers/rateLimit.js");
app.set("trust proxy", 1);
app.use("/create", apiLimiter);

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const homeRouter = require("./routes/homeRouter.js");
const createRouter = require("./routes/createRouter.js");
const createdRouter = require("./routes/createdRouter.js");
const secretRouter = require("./routes/secretRouter.js");

app.use("/", homeRouter);
app.use("/create", createRouter);
app.use("/created", createdRouter);
app.use("/secret", secretRouter);

app.use((req, res) =>
    res
        .status(404)
        .render("error", { error: "There is no such page." })
);
