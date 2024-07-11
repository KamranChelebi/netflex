import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getAllContacts = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/contact`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deleteContact = (id) => {
    axios.delete(`${BASE_URL}/api/contact/${id}`);
};

// post
export const postContact = (payload) => {
    axios.post(`${BASE_URL}/api/contact`, payload);
};