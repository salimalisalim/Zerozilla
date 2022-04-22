const express = require("express");
const app = express();
app.use(express.json());

// Import Routes
const agencyRoutes = require("./Routes/agencyRoutes");
const clientRoutes = require("./Routes/clientRoutes")

app.use("/api/v1", agencyRoutes);
app.use("/api/v1", clientRoutes);

module.exports = app;