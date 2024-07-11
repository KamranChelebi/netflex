import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getAllBlogs = async (name) => {
    let globalData;
    let URL;
    if (!name) {
        URL = BASE_URL + "/api/blogs";
    } else {
        URL = BASE_URL + `/api/blogs?name=${name}`;
    }
    await axios.get(URL).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID 
export const getBlogByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/blogs/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete  
export const deleteBlog = (id) => {
    axios.delete(`${BASE_URL}/api/blogs/${id}`);
};

// post
export const postBlog = (payload) => {
    axios.post(`${BASE_URL}/api/blogs`, payload);
};

// edit
export const editBlog = (id, payload) => {
    axios.put(`${BASE_URL}/api/blogs/${id}`, payload);
};

/////////====BLOG CATEGORY =====///////////
//getAll
export const getAllBlogCategories = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/blog-categories`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getBlogCategoryByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/blog-categories/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete for an id
export const deleteBlogCategory = (id) => {
    axios.delete(`${BASE_URL}/api/blog-categories/${id}`);
};

// post
export const postBlogCategory = (payload) => {
    axios.post(`${BASE_URL}/api/blog-categories`, payload);
};

// edit
export const editBlogCategory = (id, payload) => {
    axios.put(`${BASE_URL}/api/blog-categories/${id}`, payload);
};