import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getAllPrices = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/pricing`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//getOne
export const getPriceByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/pricing/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deletePrice = (id) => {
    axios.delete(`${BASE_URL}/api/pricing/${id}`);
};

// post
export const postPrice = (payload) => {
    axios.post(`${BASE_URL}/api/pricing`, payload);
};

// edit
export const editPrice = (id, payload) => {
    axios.put(`${BASE_URL}/api/pricing/${id}`, payload);
};