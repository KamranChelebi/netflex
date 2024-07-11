import { BASE_URL } from "./baseURL";
import axios from "axios";

//getAll
export const getAllUsers = async () => {
    let globalData;
    await axios.get(`${BASE_URL}/api/users`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

// getbyID
export const getUserByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/api/users/${id}`).then((res) => {
        globalData = res.data;
    });
    return globalData;
};

//delete
export const deleteUser = (id) => {
    axios.delete(`${BASE_URL}/api/users/${id}`);
};

// User Register
export const UserRegister = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/register`, payload);
    return response;
};

// User Login
export const UserLogin = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/login`, payload);
    return response;
};

///forgot-password
export const ForgotPasswordPost = async (payload) => {
    const response = await axios.post(`${BASE_URL}/forgot-password`, payload);
    return response;
};

///reset-password
export const ResetPasswordPut = async (token, payload) => {
    const response = await axios.put(`${BASE_URL}/reset-password/${token}`, payload);
    return response;
};

// edit
export const editUser = async (id, payload) => {
    const response = await axios.put(`${BASE_URL}/api/users/${id}`, payload);
    return response;
};