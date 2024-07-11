import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getSocials = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/socials`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//getOne
export const getSocialByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/socials/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deleteSocial = (id) => {
    axios.delete(`${BASE_URL}/api/socials/${id}`);
};

// post
export const postSocial = (payload) => {
    axios.post(`${BASE_URL}/api/socials`, payload);
};

// edit
export const editSocial = (id, payload) => {
    axios.put(`${BASE_URL}/api/socials/${id}`, payload);
};