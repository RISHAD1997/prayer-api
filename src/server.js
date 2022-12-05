const express = require("express");
const cors = require("cors");
const prayerRoute = require("./routes/index.js");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", prayerRoute);

app.listen(8080, () => {
  console.log("Connected to the server");
});
