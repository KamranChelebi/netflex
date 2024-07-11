import * as yup from "yup";

export const InformationsEditSchema = yup.object().shape({
    logoIMG: yup.mixed(),
    address: yup.string().min(6).required(),
    phone: yup.string().min(9).max(13).required(),
    email: yup.string().email().required(),
    iframe: yup.string().min(30).required(),
  });