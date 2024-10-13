import React from "react";
import { Link } from "react-router-dom";
import AuthServices from "../services/auth.services";

const NavComponent = (props) => {
  const { currentUser, setCurrentUser } = props;

  const handleLogout = () => {
    // 使用 window.confirm 顯示確認提示
    const confirmLogout = window.confirm("確定要登出嗎？");

    // 如果使用者點擊了確認按鈕
    if (confirmLogout) {
      AuthServices.logout();
      window.alert("已登出");
      setCurrentUser(null);
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
                首頁
              </Link>
            </li>
            {!currentUser && (
              <>
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/register">
                    註冊
                  </Link>
                </li>
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/login">
                    登入
                  </Link>
                </li>
              </>
            )}

            {currentUser && (
              <>
                <li className="nav-item fs-5">
                  <Link onClick={handleLogout} className="nav-link" to="#">
                    登出
                  </Link>
                </li>
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/profile">
                    個人主頁
                  </Link>
                </li>
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/course">
                    我的課程
                  </Link>
                </li>
                {currentUser.user.role === "instructor" && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link" to="/postCourse">
                      新增課程
                    </Link>
                  </li>
                )}
                {currentUser.user.role === "student" && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link" to="/enroll">
                      尋找課程
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {currentUser && (
            <div className="navbar-nav">
              <li className="nav-item fs-5">
                <span className="nav-link">
                  歡迎, {currentUser.user.username} ({currentUser.user.role})
                </span>
              </li>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
