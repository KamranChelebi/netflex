import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAllCategories
export const getAllCategories = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/categories`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getCategoryByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/categories/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//deleteCategory
export const deleteCategory = (id) => {
    axios.delete(`${BASE_URL}/api/categories/${id}`);
};

//post Category
export const postCategory = (payload) => {
    axios.post(`${BASE_URL}/api/categories`, payload);
};

//edit Category
export const editCategory = (id, payload) => {
    axios.put(`${BASE_URL}/api/categories/${id}`, payload);
};