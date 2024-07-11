import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    username: yup.string().min(5).required(),
    password: yup.string().min(6).required(),
});