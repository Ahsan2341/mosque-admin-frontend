import axiosClient from "..";
import axios from "axios";
class MosquesAPI {
  static getMosques(params) {
    return axiosClient.get(`/mosques/with-followers-and-managers?${params}`);
  }
  static getPendingMosques(params) {
    return axiosClient.get(`/mosques?mosqueStatus=PENDING&${params}`);
  }
  static getMosque(id) {
    return axiosClient.get(`/mosques/${id}`);
  }
  static updateMosque(id, data) {
    return axiosClient.patch(`/mosques/${id}`, data);
  }
  static uploadMediaApi(data) {
    return axiosClient.post("/mosques/upload-media", data);
  }
  static uploadFileApi(signedUrl, file) {
    const custom_axios = axios.create();

    return custom_axios.put(signedUrl, file);
  }
  static fetchmanagersApi(id) {
    return axiosClient.get(`/mosques/fetch-mosque-managers/${id}`);
  }
  static removemanagerApi(email, id) {
    return axiosClient.patch(`/mosques/remove-manager`, { email, id });
  }
  static approveMosques(id) {
    return axiosClient.patch(`/mosques/approve-mosque/${id}`);
  }
  static rejectMosque(id) {
    return axiosClient.patch(`/mosques/reject-mosque/${id}`);
  }
  static approvalHistory(params) {
    console.log(
      `/mosques/approval-history?mosqueStatus=APPROVED&mosqueStatus=REJECTED&${params}`
    );
    return axiosClient.get(
      `/mosques/approval-history?mosqueStatus=APPROVED&mosqueStatus=REJECTED&${params}`
    );
  }
}

export default MosquesAPI;
