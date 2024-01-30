import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseServices from "../services/course.services";

const EnrollComponent = (props) => {
  // eslint-disable-next-line
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState("");
  let [courseData, setCourseData] = useState(null);
  let [count, setCount] = useState(0);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    setCount(2);
    courseServices
      .getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    courseServices
      .enroll(e.target.id, currentUser.user._id)
      .then((course) => {
        if (course.data === "你已註冊過此課程") {
          window.alert("課程已註冊過了");
          navigate("/enroll");
        } else {
          window.alert("課程註冊成功");
          navigate("/course");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCount(1);
    courseServices
      .showAllCourse()
      .then((data) => {
        setCourseData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <button onClick={handleLogin} class="btn btn-dark btn-lg">
              登入
            </button>
          </div>
        )}

        {currentUser && currentUser.user.role === "student" && (
          <div>
            <h1>尋找課程</h1>
          </div>
        )}

        {currentUser && currentUser.user.role === "student" && (
          <div className="search input-group mb-3">
            <input
              onChange={handleChangeInput}
              type="text"
              class="form-control"
              placeholder="輸入您想找的課程名稱"
            />
            <button onClick={handleSearch} className="btn btn-dark">
              尋找課程
            </button>
          </div>
        )}
        <br />

        {count === 1 && courseData && courseData.length !== 0 && (
          <div>
            <h4>以下是所有的課程</h4>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {courseData.map((course) => (
                <div key={course._id} className="col">
                  <div className="card border-dark">
                    <div className="card-body">
                      <h5 className="card-title fs-3">{course.title}</h5>
                      <p
                        className="card-text"
                        style={{ height: "3rem", overflow: "hidden" }}
                      >
                        課程描述： {course.description}
                      </p>
                      <p className="card-text">
                        老師名稱： {course.instructor.username}
                      </p>
                      <p className="card-text">
                        電子郵件： {course.instructor.email}
                      </p>
                      <p className="card-text">課程價錢： {course.price}元</p>
                      <p>上課人數： {course.student.length} 人</p>
                      <button
                        onClick={handleEnroll}
                        className="btn btn-dark"
                        id={course._id}
                      >
                        選擇課程
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentUser && searchResult && searchResult.length === 0 && (
          <div>
            <h4>找不到您想要的相關課程...</h4>
          </div>
        )}

        {currentUser && searchResult && searchResult.length !== 0 ? (
          <div>
            <h4>以下是您尋找的課程</h4>
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="card border-dark"
                style={{ marginBottom: "1rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title fs-3">{course.title}</h5>
                  <p className="card-text">課程描述： {course.description}</p>
                  <p className="card-text">
                    老師名稱： {course.instructor.username}
                  </p>
                  <p className="card-text">
                    電子郵件： {course.instructor.email}
                  </p>
                  <p className="card-text">課程價錢： {course.price}元</p>
                  <p>上課人數： {course.student.length} 人</p>
                  <button
                    onClick={handleEnroll}
                    className="btn btn-dark"
                    id={course._id}
                  >
                    選擇課程
                  </button>
                  <br />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default EnrollComponent;
