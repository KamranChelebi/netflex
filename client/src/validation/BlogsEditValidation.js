import * as yup from "yup";

export const editBlogSchema = yup.object().shape({
    title: yup.string().min(10).required("Blog Title a required field"),
    imageURL: yup.mixed(),
    firstDesc: yup.string().min(35).required("1st Description is a required field"),
    secondDesc: yup.string().min(35).required("2nd Description is a required field"),
    categoryID: yup.string().required("Category is a required field"),
});