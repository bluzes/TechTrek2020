export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      //console.log(user.token);
      return user;
    } else {
      return {};
    }
  }