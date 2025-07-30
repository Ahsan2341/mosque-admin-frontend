import axiosClient from "..";

class FaqAPI {
  static getFaqs(params) {
    return axiosClient.get(`/faqs?${params}`);
  }
  static updateFaq(id, faq) {
    return axiosClient.patch(`/faqs/${id}`, faq);
  }
  static deleteFaq(id) {
    return axiosClient.delete(`/faqs/${id}`);
  }
  static addFaq(faq) {
    return axiosClient.post(`/faqs`, faq);
  }
}

export default FaqAPI;
