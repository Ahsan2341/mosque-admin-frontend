import axiosClient from "..";

class UsersAPI {
  static getUsers(params) {
    return axiosClient.get(`/users/all-users?${params}`);
  }

  static activateUser(id, isActive) {
    return axiosClient.patch("/users/activate-user", { id, isActive: true });
  }
  static deactivateUser(id) {
    return axiosClient.patch("/users/deactivate-user", { id, isActive: false });
  }
}

export default UsersAPI;
