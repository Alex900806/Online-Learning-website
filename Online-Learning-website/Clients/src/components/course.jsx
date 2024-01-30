import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.services";

const CourseComponent = (props) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  let { currentUser, setCurrentUser } = props;
  let [courseData, setCourseData] = useState(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleEditCourse = (e) => {
    let course_id = e.target.id;
    navigate(`/editCourse?course_id=${course_id}`);
  };

  const handleDeleteCourse = (e) => {
    let course_id = e.target.id;
    CourseService.deleteMyCourse(course_id)
      .then(() => {
        window.alert("課程已成功刪除");
        window.location.reload(); // 重新加載當前頁面
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //載入課程資料
  useEffect(() => {
    console.log("using effect");
    if (currentUser.user.role === "instructor") {
      CourseService.showCourse()
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (currentUser.user.role === "student") {
      CourseService.showEnrolledCourse()
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

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
          minHeight: "95vh",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div style={{ padding: "3rem" }}>
        {!currentUser && (
          <div>
            <p>你必須先登入才能看到此頁面</p>
            <button onClick={handleLogin} className="btn btn-dark btn-lrg">
              登入
            </button>
          </div>
        )}

        {/* 老師頁面 */}
        {currentUser && currentUser.user.role === "instructor" && (
          <div>
            <h1>{currentUser.user.username}老師的課程清單</h1>
            <p>假如還沒有課程的話，趕快去新增課程吧！</p>
          </div>
        )}
        {currentUser.user.role === "instructor" &&
        courseData &&
        courseData.length !== 0 ? (
          <div>
            {courseData.map((course) => (
              <div
                key={course._id}
                className="card border-dark"
                style={{ marginBottom: "1rem", opacity: 0.9 }}
              >
                <div className="card-body">
                  <h5 className="card-title fs-3">{course.title}</h5>
                  <p className="card-text">課程描述： {course.description}</p>
                  <p className="card-text">
                    教師名稱： {course.instructor.username}
                  </p>
                  <p className="card-text">
                    電子郵件： {course.instructor.email}
                  </p>
                  <p className="card-text">課程價錢： {course.price}元</p>
                  <p>上課人數： {course.student.length} 人</p>
                  <button
                    onClick={handleEditCourse}
                    className="btn btn-secondary fs-5"
                    id={course._id}
                  >
                    編輯課程
                  </button>
                  <br />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* 學生頁面 */}
        {currentUser && currentUser.user.role === "student" && (
          <div>
            <h1>{currentUser.user.username}的課程清單</h1>
            <p>假如還沒有課程的話，趕快去尋找課程吧！</p>
          </div>
        )}

        {currentUser.user.role === "student" &&
        courseData &&
        courseData.length !== 0 ? (
          <div>
            {courseData.map((course) => (
              <div
                key={course._id}
                className="card border-dark"
                style={{ marginBottom: "1rem", opacity: 0.9 }}
              >
                <div
                  className="card-body"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h5 className="card-title fs-3">{course.title}</h5>
                  <p className="card-text">課程描述： {course.description}</p>
                  <p className="card-text">
                    教師名稱： {course.instructor.username}
                  </p>
                  <p className="card-text">
                    電子郵件： {course.instructor.email}
                  </p>
                  <p className="card-text">課程價錢： {course.price}元</p>
                  <p>上課人數： {course.student.length} 人</p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button className="btn btn-dark fs-5">開始課程</button>
                    <button
                      onClick={handleDeleteCourse}
                      className="btn btn-danger fs-5"
                      id={course._id}
                    >
                      刪除課程
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default CourseComponent;
