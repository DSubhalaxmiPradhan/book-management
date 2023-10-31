"use strict";
const express = require("express");
const app = express();
const helmet = require("helmet");
const { PORT } = require("./app/config/config");
const connectDB = require("./app/config/mongodb.config");
var cors = require("cors");
const morgan = require('morgan');
const router = express.Router();

const path = require('path');
const fs = require('fs');

connectDB();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet()); 
app.use(morgan("common"));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', router);

//Dynamic Route Path
const routesPath = path.join(__dirname, 'app/routes');
const routeFiles = fs.readdirSync(routesPath);

routeFiles.forEach((routeFile) => {
  if (routeFile !== 'index.js' && routeFile.endsWith('.js')) {
    const routeModule = require(path.join(routesPath, routeFile));
    routeModule(router); // Call the route module function and pass the central router
  }
});


app.get("/api/health",  (req, res) =>
  res.send({ message: `Backend server is Running on ${PORT}` })
);

app.get("*", function (req, res) {
  res.status(404).send("Invalid URL..");
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});