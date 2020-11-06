const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const router = require("./router");

mongoose.connect("mongodb://localhost:auth/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on ${port}......`));
