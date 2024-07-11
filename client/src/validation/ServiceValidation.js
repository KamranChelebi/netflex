import * as yup from "yup";

export const ServiceSchema = yup.object().shape({
    title: yup.string().min(10).required("Title is a required field"),
    iconClass: yup.string().min(10).required("Icon Class is a required field"),
    desc: yup.string().min(35).required("Description is a required field"),
});