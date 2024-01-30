import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CourseService from "../services/course.services";

const EditCourseComponent = (props) => {
  // eslint-disable-next-line
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const editCourse = () => {
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get("course_id");
    CourseService.editCourse(courseId, title, description, price)
      .then(() => {
        window.alert("課程已成功編輯");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  const deleteCourse = () => {
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get("course_id");
    CourseService.deleteCourse(courseId)
      .then(() => {
        window.alert("課程已成功刪除");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  //先載入要編輯的課程資料
  useEffect(() => {
    console.log("using effect");
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get("course_id");
    if (currentUser.user.role === "instructor") {
      CourseService.showOneCourse(courseId).then((course) => {
        if (course.data !== undefined) {
          setTitle(course.data.title);
          setDescription(course.data.description);
          setPrice(course.data.price);
        }
      });
    }
    // eslint-disable-next-line
  }, [location.search]);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>你必須先登入才能看到此頁面</p>
          <button onClick={handleLogin} class="btn btn-dark btn-lg">
            登入
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>編輯課程</h1>
        </div>
      )}

      {currentUser && currentUser.user.role === "instructor" && (
        <div className="form-group">
          <label for="forTitle">課程標題</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="forTitle"
            placeholder="輸入課程標題"
            onChange={handleChangeTitle}
            value={title}
          />
          <br />
          <label for="forDescription">課程描述</label>
          <textarea
            name="description"
            className="form-control"
            id="forDescription"
            aria-describedby="emailHelp"
            placeholder="輸入課程內容"
            onChange={handleChangeDescription}
            value={description}
          />
          <br />
          <label for="forPrice">課程價錢</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="forPrice"
            placeholder="輸入課程價錢"
            onChange={handleChangePrice}
            value={price}
          />
          <br />
          <button
            className="btn btn-dark"
            onClick={editCourse}
            style={{ marginRight: "1rem" }}
          >
            編輯完成
          </button>
          <button className="btn btn-danger" onClick={deleteCourse}>
            刪除課程
          </button>
          <br />
          <br />
          {message && <div className="alert alert-warning">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default EditCourseComponent;
