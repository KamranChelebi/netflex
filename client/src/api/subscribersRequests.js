import { BASE_URL } from "./baseURL";
import axios from "axios";

//get
export const getAllSubscribers = async (name) => {
    let globalData;
    let URL;
    if (!name) {
        URL = BASE_URL + "/api/subscribers";
    } else {
        URL = BASE_URL + `/api/subscribers?name=${name}`;
    }
    await axios.get(URL).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deleteSubscriber = (id) => {
    axios.delete(`${BASE_URL}/api/subscribers/${id}`);
};

// post
export const postSubscriber = (payload) => {
    axios.post(`${BASE_URL}/api/subscribers`, payload);
};