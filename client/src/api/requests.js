import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAllQualities
export const getQualities = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/qualities`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getQualityByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/qualities/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//deleteQuality
export const deleteQuality = (id) => {
    axios.delete(`${BASE_URL}/api/qualities/${id}`);
};

//post Quality
export const postQuality = (payload) => {
    axios.post(`${BASE_URL}/api/qualities`, payload);
};

//edit Quality
export const editQuality = (id, payload) => {
    axios.put(`${BASE_URL}/api/qualities/${id}`, payload);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getAllLanguages
export const getLanguages = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/languages`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getLanguageByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/languages/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//deleteLanguage
export const deleteLanguage = (id) => {
    axios.delete(`${BASE_URL}/api/languages/${id}`);
};

//post Language
export const postLanguage = (payload) => {
    axios.post(`${BASE_URL}/api/languages`, payload);
};

//edit Language
export const editLanguage = (id, payload) => {
    axios.put(`${BASE_URL}/api/languages/${id}`, payload);
};