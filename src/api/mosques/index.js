import axiosClient from "..";
import axios from "axios";
class MosquesAPI {
  static getMosques(params) {
    return axiosClient.get(`/mosques/with-followers-and-managers?${params}`);
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
}

export default MosquesAPI;
