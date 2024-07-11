import * as yup from "yup";
const SUPPORTED_FORMATS = ["jpg", "png", "jpeg"];

export const SliderAddSchema = yup.object().shape({
    title: yup.string().min(5).required(),
    imageURL: yup.mixed().test("FILE_TYPE", "Invalid file format selected", (value) => value && SUPPORTED_FORMATS.includes(value.split('.')[1])).required(),
    trailerURL: yup.string().min(5).required(),
})