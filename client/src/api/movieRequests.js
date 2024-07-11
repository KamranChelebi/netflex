import { BASE_URL } from "./baseURL";
import axios from "axios";

//get
export const getAllMovies = async (name) => {
    let globalData;
    let URL;
    if (!name) {
        URL = BASE_URL + "/api/movies";
    } else {
        URL = BASE_URL + `/api/movies?name=${name}`;
    }
    await axios.get(URL).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getOneMovie = async (id, token) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/movies/${id}`, {
        headers: {
            'access-token': token
        }
    }).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deleteMovie = (id) => {
    axios.delete(`${BASE_URL}/api/movies/${id}`);
};

// post
export const postMovie = (payload) => {
    axios.post(`${BASE_URL}/api/movies`, payload);
};

// edit
export const editMovie = (id, payload) => {
    axios.put(`${BASE_URL}/api/movies/${id}`, payload);
};