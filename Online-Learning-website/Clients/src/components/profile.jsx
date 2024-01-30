import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.services";

const ProfileComponent = (props) => {
  // eslint-disable-next-line
  let { currentUser, setCurrentUser } = props;
  // 檢查 currentUser 是否存在以及 currentUser.user.date 是否為有效日期字串
  const dateStr = currentUser && currentUser.user.date;

  // 使用 Intl.DateTimeFormat 將日期字串轉換為本地日期格式
  const formattedDate = dateStr
    ? new Intl.DateTimeFormat().format(new Date(dateStr))
    : "無效日期";

  let [courseData, setCourseData] = useState(0);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  //載入課程資料
  useEffect(() => {
    console.log("using effect");
    if (currentUser.user.role === "instructor") {
      CourseService.showCourse()
        .then((data) => {
          setCourseData(data.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (currentUser.user.role === "student") {
      CourseService.showEnrolledCourse()
        .then((data) => {
          setCourseData(data.data.length);
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
          height: "95vh",
          zIndex: -1,
        }}
      />
      <div style={{ padding: "3rem" }}>
        {!currentUser && <div className="fs-2">你必須先登入才能看到此頁面</div>}

        {currentUser && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>{currentUser.user.username}的個人資料</h1>
              <button onClick={handleEditProfile} className="btn btn-secondary">
                修改
              </button>
            </div>

            <table className="table" style={{ opacity: 0.6 }}>
              <tbody>
                <tr>
                  <td>
                    <strong>ID :</strong>
                  </td>
                  <td>{currentUser.user._id}</td>
                </tr>

                <tr>
                  <td>
                    <strong>身份 :</strong>
                  </td>
                  <td>{currentUser.user.role}</td>
                </tr>

                <tr>
                  <td>
                    <strong>電子郵件 :</strong>
                  </td>
                  <td>{currentUser.user.email}</td>
                </tr>

                <tr>
                  <td>
                    <strong>課程註冊數量 :</strong>
                  </td>
                  <td>{courseData}</td>
                </tr>

                <tr>
                  <td>
                    <strong>註冊時間 :</strong>
                  </td>
                  <td>{formattedDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileComponent;
