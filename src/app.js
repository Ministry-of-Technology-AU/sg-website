// Import required Node.js modules
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3001;

// Import route handler for the website
const websiteRoutes = require("./routes/websiteRoutes.js");

// Configure application settings and middleware

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(
  "/",
  express.static(__dirname + "/public", {
    dotfiles: "ignore",
    etag: false,
    extensions: ["htm", "html"],
    index: false,
    maxAge: "2d",
    redirect: false,
    setHeaders(res, path, stat) {
      res.set("x-timestamp", Date.now());
    },
  })
);

// Mount website routes
app.use("/", websiteRoutes);

// Default route for handling 404 errors
app.get("*", (req, res) => {
  res.send("error 404");
});

// Start the Express application and listen on the specified port
app.listen(port, () => {
  console.log("Listening on port " + port);
});
