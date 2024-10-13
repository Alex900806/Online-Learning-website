import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/auth.services";

const LoginComponent = (props) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  let { currentUser, setCurrentUser } = props;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    AuthServices.login(email, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.alert("登入成功，將導入至個人主頁");

        setCurrentUser(AuthServices.getCurrentUser());

        navigate("/profile");
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  const handleRegister = () => {
    navigate("/register");
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
          {message && <div className="alert alert-danger">{message}</div>}

          <div className="form-group">
            <label htmlFor="username">電子郵件</label>
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
            <button
              onClick={handleLogin}
              className="btn btn-dark btn-block"
              style={{ marginRight: "1rem" }}
            >
              <span>登入</span>
            </button>
            <button
              onClick={handleRegister}
              className="btn btn-secondary btn-block"
            >
              <span>還沒註冊嗎 點我一下吧</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginComponent;
