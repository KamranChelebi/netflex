import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getAllServices = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/services`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getServiceByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/services/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deleteService = (id) => {
    axios.delete(`${BASE_URL}/api/services/${id}`);
};

// post
export const postService = (payload) => {
    axios.post(`${BASE_URL}/api/services`, payload);
};

// edit
export const editService = (id, payload) => {
    axios.put(`${BASE_URL}/api/services/${id}`, payload);
};