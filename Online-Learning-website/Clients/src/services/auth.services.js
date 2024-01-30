import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

class AuthService {
  //登入串接
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  //登出
  logout() {
    localStorage.removeItem("user");
  }
  //註冊串接
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  //個人資訊
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  //修改個字串接
  editUser(username, email, password, role) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }

    return axios.post(API_URL + "/editProfile/" + token.user._id, {
      username,
      email,
      password,
      role,
    });
  }
}
// eslint-disable-next-line
export default new AuthService();
