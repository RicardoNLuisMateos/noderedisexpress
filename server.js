const { default: axios } = require("axios");
const express = require("express");
const characterRouter = require("./routers/characterRouter")
const app = express();

//Routes here
app.use("/api", characterRouter);

const PORT = 4000;

module.exports = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//https://noahkreiger.medium.com/nodejs-redis-setting-it-up-asynchronously-ba8db73e07de