import axiosClient from "..";

class AuthAPI {
  static logIn(data) {
    return axiosClient.post("/auth/login", data);
  }

  static googleLogIn(data) {
    return axiosClient.post("/auth/google/sign-in", data);
  }
  static signUp(data) {
    return axiosClient.post("/auth/signup", data);
  }
  static forgetPassword(data) {
    return axiosClient.post("/auth/forgot-password", data);
  }
  static resetPassword(data) {
    return axiosClient.post("/auth/reset-password", data);
  }
  static generateOtp(data) {
    return axiosClient.post("/auth/generate-verify-email-otp", data);
  }
  static verifyEmail(data) {
    return axiosClient.post("/auth/verify-email", data);
  }
  static updatePassword(data) {
    return axiosClient.patch("/users/update-password", data);
  }
  static updateUser(data) {
    return axiosClient.patch("/users/update-user", data);
  }
  static verifyToken(token) {
    return axiosClient.get("/auth/verify-token", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  static fetchUser(id) {
    return axiosClient.get(`/users/who-am-i?_id=${id}`);
  }
}

export default AuthAPI;
