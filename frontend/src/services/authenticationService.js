const LOGIN_API = "http://techtrek2020.ap-southeast-1.elasticbeanstalk.com/login"
const LOGIN_CRED_USERNAME = "elliotlow"
const LOGIN_CRED_PASSWORD = 'd70dd062869f2e48'
class AuthService {
  async login(username, password) {
    const reqbody = {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    const res = await fetch(LOGIN_API, reqbody);
    const resData = await res;
    if (resData) {
        console.log("MY Data: " + resData)
      localStorage.setItem("user", JSON.stringify(resData));
      return resData;
    } else {
      return "error";
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