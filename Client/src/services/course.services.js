import axios from "axios";
const API_URL = "http://localhost:8080/api";

class CourseService {
  //新增課程串接（老師）
  postCourse(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/course",
      {
        title,
        description,
        price,
      },
      {
        headers: {
          Authorization: token.token,
        },
      }
    );
  }

  //顯示特定老師所有擁有的課程串接（老師）
  showCourse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }
    return axios.get(API_URL + "/instructor/" + token.user._id, {
      headers: {
        Authorization: token.token,
      },
    });
  }

  //顯示特定學生擁有的課程串接（學生）
  showEnrolledCourse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }
    return axios.get(API_URL + "/student/" + token.user._id, {
      headers: {
        Authorization: token.token,
      },
    });
  }

  //顯示所有課程
  showAllCourse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }
    return axios.get(API_URL + "/allCourse", {
      headers: {
        Authorization: token.token,
      },
    });
  }

  //顯示用名稱尋找的課程（學生）
  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token.token,
      },
    });
  }

  //註冊課程（學生）
  enroll(_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/enroll/" + _id,
      { user_id },
      {
        headers: {
          Authorization: token.token,
        },
      }
    );
  }

  //顯示特定課程串接（老師）
  showOneCourse(courseId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }
    return axios.get(API_URL + "/instructor/oneCourse/" + courseId, {
      headers: {
        Authorization: token.token,
      },
    });
  }

  //編輯課程串接（老師）
  editCourse(courseId, title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/instructor/edit/" + courseId,
      {
        title,
        description,
        price,
      },
      {
        headers: {
          Authorization: token.token,
        },
      }
    );
  }

  //刪除課程串接（老師）
  deleteCourse(courseId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/instructor/delete/" + courseId, {
      headers: {
        Authorization: token.token,
      },
    });
  }

  //刪除課程串接（學生）
  deleteMyCourse(courseId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"));
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/student/delete/" + courseId, {
      headers: {
        Authorization: token.token,
      },
    });
  }
}

// eslint-disable-next-line
export default new CourseService();
