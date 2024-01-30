import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/auth.services";

const EditProfileComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
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
  const handleEdit = () => {
    AuthServices.editUser(username, email, password, role)
      .then(() => {
        window.alert("修改成功，請重新登入");
        AuthServices.logout();
        setCurrentUser(null);
        navigate("/login");
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  //先載入要編輯的個人資料
  useEffect(() => {
    console.log("using effect");
    setUsername(currentUser.user.username);
    setEmail(currentUser.user.email);
    setRole(currentUser.user.role);
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
              value={username}
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
              value={email}
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
            <label htmlFor="role">身份(不可修改)</label>
            <input
              onChange={handleChangeRole}
              type="text"
              className="form-control"
              name="role"
              value={role}
              readOnly
            />
          </div>
        </div>

        <br />
        <button onClick={handleEdit} className="btn btn-dark ">
          <span>修改完成</span>
        </button>
      </div>
    </main>
  );
};

export default EditProfileComponent;
