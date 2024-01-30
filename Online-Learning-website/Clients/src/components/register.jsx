import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/auth.services";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");
  let [showPassword, setShowPassword] = useState(false);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRegister = () => {
    // 會返回一個Promises
    AuthServices.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功，將返回登入頁面");
        navigate("/login");
      })
      .catch((error) => {
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
      <div style={{ padding: "3rem" }} className="col-md-12">
        <div>
          {/* 顯示錯誤訊息 */}
          {message && <div className="alert alert-danger">{message}</div>}
          <div>
            <label htmlFor="username">使用者名稱</label>
            <input
              onChange={handleChangeUsername}
              type="text"
              className="form-control"
              name="username"
              placeholder="輸入使用者名稱"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">電子郵件</label>
            <input
              onChange={handleChangeEmail}
              type="text"
              className="form-control"
              name="email"
              placeholder="輸入電子郵件"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <div className="input-group">
              <input
                onChange={handleChangePassword}
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="輸入密碼"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "隱藏" : "顯示"}
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="form-group">
            <label>身份</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="student"
                name="role"
                value="student"
                onChange={handleChangeRole}
              />
              <label className="form-check-label fs-5" htmlFor="student">
                學生
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="instructor"
                name="role"
                value="instructor"
                onChange={handleChangeRole}
              />
              <label className="form-check-label fs-5" htmlFor="instructor">
                教師
              </label>
            </div>
          </div>

          <br />
          <button onClick={handleRegister} className="btn btn-dark ">
            <span>註冊</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default RegisterComponent;
