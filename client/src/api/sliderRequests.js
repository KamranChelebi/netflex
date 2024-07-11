import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getAllSliders = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/sliders`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getSliderByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/sliders/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deleteSlider = (id) => {
    axios.delete(`${BASE_URL}/api/sliders/${id}`);
};

// post
export const postSlider = (payload) => {
    axios.post(`${BASE_URL}/api/sliders`, payload);
};

// edit
export const editSlider = (id, payload) => {
    axios.put(`${BASE_URL}/api/sliders/${id}`, payload);
};