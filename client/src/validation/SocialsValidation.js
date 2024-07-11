import * as yup from "yup";

export const SocialsSchema = yup.object().shape({
    icon: yup.string().min(10).required("Icon Class is a required field"),
    link: yup.string().min(15).url().required("Link is a required field"),
});