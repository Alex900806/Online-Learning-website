import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <main style={{ position: "relative", zIndex: 0 }}>
      <img
        src="/bkg.jpeg"
        className="img-fluid"
        alt="bkg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3" style={{ opacity: 0.9 }}>
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Lexie 的學習網站</h1>
            <p className="col-md-10 fs-4">
              此系統使用 React.js 作為前端框架，而 Node.js 和 MongoDB
              作為後端伺服器。此類型的專案被稱為 MERN
              專案，是創建現代網站的最流行方式之一。
            </p>
            {/* <button className="btn btn-primary btn-lg" type="button">
              開始學習
            </button> */}
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div
              className="h-100 p-5 bg-secondary-subtle rounded-3"
              style={{ opacity: 0.9 }}
            >
              <h2>學生身份</h2>
              <p>
                學生可以註冊參加他們喜歡的課程。這個網站僅供練習使用，因此請不要提供任何個人信息，例如信用卡號碼。
              </p>
              <button
                onClick={handleLogin}
                className="btn btn-outline-dark"
                type="button"
              >
                登入 / 註冊
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="h-100 p-5 bg-secondary-subtle rounded-3"
              style={{ opacity: 0.9 }}
            >
              <h2>教師身份</h2>
              <p>
                您可以通過註冊成為教師，開始製作線上課程。這個網站僅供練習使用，因此請不要提供任何個人信息，例如信用卡號碼。
              </p>
              <button
                onClick={handleLogin}
                class="btn btn-outline-dark"
                type="button"
              >
                登入 / 註冊
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2023 Lexie Wang
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
