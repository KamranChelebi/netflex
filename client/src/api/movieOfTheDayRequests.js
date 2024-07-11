import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getMovieOfTheDay = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/movieoftheday`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getMovieOfTheDayByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/movieoftheday/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// edit
export const editMovieOfTheDay = (id, payload) => {
    axios.put(`${BASE_URL}/api/movieoftheday/${id}`, payload);
};