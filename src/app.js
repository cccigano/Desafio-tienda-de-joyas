const express = require("express");
const joyasRoutes = require("./routes/joyasRoutes.js");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api", joyasRoutes);

module.exports = app;
