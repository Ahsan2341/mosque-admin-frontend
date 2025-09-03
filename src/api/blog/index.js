import axiosClient from "..";

class BlogAPI {
  static createBlog(data) {
    return axiosClient.post("/blogs", data);
  }

  static allBlogs(page, limit) {
    return axiosClient.get(`/blogs?page=${page}&limit=${limit}`);
  }
  static getBlog(paraLink) {
    return axiosClient.get(`/blogs/${paraLink}`);
  }
  static getPublishedBlogs(page, limit) {
    return axiosClient.get(`/blogs?page=${page}&limit=${limit}`);
  }
  static updateBlog(id, data) {
    return axiosClient.patch(`/blogs/${id}`, data);
  }
  static uploadMediaApi(data) {
    return axiosClient.patch("/blogs/upload-blog-image-url", data);
  }
  static deleteBlog(id) {
    return axiosClient.delete(`/blogs/${id}`);
  }
  static fetchCategories() {
    return axiosClient.get("/blogs/categories");
  }
  static createCategory(data) {
    return axiosClient.post("/blogs/create-category", data);
  }
  static fetchRelatedBlogs(catId) {
    return axiosClient.get(`blogs/related-blogs/${catId}`);
  }
}

export default BlogAPI;
