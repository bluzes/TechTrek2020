import axios from 'axios';

import jwt_decode from "jwt-decode";

const LOGIN_API = "http://techtrek2020.ap-southeast-1.elasticbeanstalk.com/login"
const LOGIN_CRED_USERNAME = "elliotlow"
const LOGIN_CRED_PASSWORD = 'd70dd062869f2e48'
class AuthService {
  async login(username, password) {
    const res1 = await axios.post(LOGIN_API, {
      username: username,
      password: password
    })
      const resData = res1.data;
      if (resData) {
        var jwt = jwt_decode(resData);
        console.log(jwt);
        localStorage.setItem("user", JSON.stringify(resData));
        return resData;
      } else {
        console.log("bad response")
        return resData;
      }
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();