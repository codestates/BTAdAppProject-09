const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const { sequelize } = require("./models");
dotenv.config();

const routes = require("./routes");

const app = express();

app.set("port", process.env.PORT || 8000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ DB 연결 성공 ✅");
  })
  .catch(err => {
    console.error(err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get("/", function (req, res, next) {
  res.status(200).send({ message: "server is running..." });
});

app.use("/api", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err["status"] = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});

app.listen(app.get("port"), () => {
  console.log(`✅ Server listening on port: ${app.get("port")} ✅`);
});

module.exports = app;
