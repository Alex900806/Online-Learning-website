//基本
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//路徑
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
//config
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//連接資料庫
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
// 告訴 Passport 不使用 session-based 身份驗證，因為 JWT 是一種基於 token 的驗證方式，不需要使用 session
app.use("/api", passport.authenticate("jwt", { session: false }), courseRoute);

//Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
