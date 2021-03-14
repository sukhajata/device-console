const express = require("express");
const path = require("path");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

app.get("/version", (req, res) => {
  res.send("1.2.2");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 9013;
app.listen(port);

console.log("App is listening on port " + port);