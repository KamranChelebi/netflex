import * as yup from "yup";

export const contactPostSchema = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address").required(),
    subject: yup.string().min(10).required(),
    message: yup.string().min(3).required(),
});