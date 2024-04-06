const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../validation").courseValidation;

//測試用
// router.use((req, res, next) => {
//   console.log("已經進入course-route.js");
//   next();
// });

//顯示所有課程(學生)
router.get("/allCourse", (req, res) => {
  Course.find({})
    .populate("instructor", ["username", "email", "price"])
    .then((course) => {
      res.send(course);
    })
    .catch(() => {
      res.status(500).send("沒有任何課程");
    });
});

//顯示特定課程（老師）
router.get("/instructor/oneCourse/:_id", (req, res) => {
  let { _id } = req.params;
  Course.findOne({ _id })
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      res.send(e);
    });
});

//用名稱尋找課程(學生)
router.get("/findByName/:name", (req, res) => {
  let { name } = req.params;
  Course.find({ title: name })
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.status(200).send(course);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//顯示註冊的課程(學生)
router.get("/student/:_student_id", (req, res) => {
  let { _student_id } = req.params;
  Course.find({ student: _student_id })
    .populate("instructor", ["username", "email"])
    .then((courses) => {
      res.status(200).send(courses);
    })
    .catch(() => {
      res.status(500).send("找不到課程");
    });
});

//顯示擁有課程（老師）
router.get("/instructor/:_instructor_id", (req, res) => {
  let { _instructor_id } = req.params;
  Course.find({ instructor: _instructor_id })
    .populate("instructor", ["username", "email"])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send("找不到課程資訊");
    });
});

//註冊課程（學生）
router.post("/enroll/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const course = await Course.findOne({ _id: id });

    // 檢查是否已經存在於陣列中
    if (course.student.includes(user_id)) {
      return res.status(200).send("你已註冊過此課程");
    }

    course.student.push(user_id);
    await course.save();
    res.status(200).send("完成註冊");
  } catch (err) {
    res.status(500).send(err);
  }
});

//新增課程（老師）
router.post("/course", async (req, res) => {
  //檢查
  let { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { title, description, price } = req.body;
  if (req.user.isStudent()) {
    return res.status(400).send("學生無法新增課程");
  }

  let newCourse = new Course({
    title,
    description,
    price,
    instructor: req.user._id,
  });
  try {
    await newCourse.save();
    res.status(200).send("課程已成功新增");
  } catch (err) {
    res.status(400).send("課程新增失敗");
  }
});

//修改課程（老師）
router.patch("/instructor/edit/:_id", async (req, res) => {
  //檢查
  let { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "找不到課程",
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isInstructor()) {
    Course.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("課程已更新成功");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({ success: false, message: "沒有權限更改" });
  }
});

//刪除課程（學生）
router.delete("/student/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    // 找到對應的課程
    const course = await Course.findOne({ _id });

    // 如果找不到課程，返回錯誤
    if (!course) {
      res.status(404).json({
        success: false,
        message: "找不到課程",
      });
      return;
    }

    // 檢查是否具有刪除權限
    if (course.student.includes(req.user._id) || req.user.isStudent()) {
      // 使用 $pull 來刪除學生
      await Course.updateOne({ _id }, { $pull: { student: req.user._id } });

      res.send("課程已刪除成功");
    } else {
      res.status(403).json({
        success: false,
        message: "沒有權限刪除",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//刪除課程（老師）
router.delete("/instructor/delete/:_id", async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "找不到課程",
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isInstructor()) {
    Course.deleteOne({ _id })
      .then(() => {
        res.send("課程已刪除成功");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({ success: false, message: "沒有權限刪除" });
  }
});

module.exports = router;
