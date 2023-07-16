const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// define paths for express cpnfig
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// allows express to use  static contents of a particular folder
app.use(express.static(publicDirPath));

// setup handlebars egnine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", { title: "weather app", name: "shriya" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about me", name: "shriya" });
});
app.get("/help", (req, res) => {
  res.render("help", { contact: "1234567890", title: "help", name: "shirya" });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 ",
    name: "shriya",
    errorMsg: "Help Article Not Found",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "shriya",
    errorMsg: "404: Page Not Found",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
