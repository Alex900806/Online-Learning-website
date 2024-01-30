const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//route start
router.get((req, res, next) => {
  console.log("已經進入auth.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "testAPI在執行中",
  };
  return res.json(msgObj);
});

//註冊相關
router.post("/register", async (req, res) => {
  //檢查
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("使用者已註冊");
  }

  //存入資料庫
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "success",
      saveObject: savedUser,
    });
  } catch (err) {
    res.status(400).send("註冊失敗");
  }
});

//登入相關
router.post("/login", async (req, res) => {
  //檢查
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //尋找使用者
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("找不到使用者");
    }

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) {
        return res.status(400).send(err);
      }
      if (isMatch) {
        const tokenObject = { _id: user._id, email: user.email };
        const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
        res.send({
          success: true,
          token: "JWT " + token,
          user,
        });
      } else {
        res.status(401).send("錯誤密碼");
      }
    });
  } catch (err) {
    res.status(500).send(err.message || "內部伺服器錯誤");
  }
});

// 修改個資
router.post("/editProfile/:_id", async (req, res) => {
  // 檢查
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { _id } = req.params;
  const user = await User.findOne({ _id: _id });

  if (!user) {
    res.status(404);
    return res.json({
      success: false,
      message: "找不到使用者",
    });
  }

  // 應用密碼處理 middleware
  if (req.body.password) {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
  }

  // 更新使用者資料
  User.findOneAndUpdate({ _id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then(() => {
      res.send("資料已更新成功");
    })
    .catch((e) => {
      res.send({
        success: false,
        message: e,
      });
    });
});

module.exports = router;
