import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.services";

const PostCourseComponent = (props) => {
  // eslint-disable-next-line
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");

  const navigate = useNavigate();
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
  const postCourse = () => {
    CourseService.postCourse(title, description, price)
      .then(() => {
        window.alert("課程已被成功新增");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  return (
    <main style={{ position: "relative", zIndex: 0 }}>
      <img
        src="/bkg2.jpeg"
        className="img-fluid"
        alt="bkg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
        }}
      />
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
            <h1>新增課程</h1>
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
            />
            <br />
            <label for="forDescription">課程描述</label>
            <textarea
              name="description"
              className="form-control"
              id="forDescription"
              aria-describedby="emailHelp"
              placeholder="輸入課程內容(限30字)"
              maxlength="30"
              onChange={handleChangeDescription}
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
              step="100"
            />
            <br />
            <button className="btn btn-dark fs-5" onClick={postCourse}>
              新增課程
            </button>
            <br />
            <br />
            {message && <div className="alert alert-warning">{message}</div>}
          </div>
        )}
      </div>
    </main>
  );
};

export default PostCourseComponent;
