import * as yup from "yup";

export const movieOfTheDaySchema = yup.object().shape({
    title: yup.string().min(3).required("Movie Title a required field"),
    IMDB: yup.number().positive().min(0).required(),
    qualityID: yup.string().required("Quality is a required field"),
    desc: yup.string().min(35).required("Description is a required field"),
    trailerURL: yup.string().min(25).required("Trailer URL is a required field"),
});