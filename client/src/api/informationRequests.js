import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getInformations = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/information`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//getOne
export const getInformationByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/information/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// edit
export const editInformation = (id, payload) => {
    axios.put(`${BASE_URL}/api/information/${id}`, payload);
};