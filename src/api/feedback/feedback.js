import axiosClient from "..";

class FeedbackAPI {
  static getAllFeedbacks() {
    return axiosClient.get(`/feedback`);
  }
}

export default FeedbackAPI;
