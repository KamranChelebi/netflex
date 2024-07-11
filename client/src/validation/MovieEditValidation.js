import * as yup from "yup";

export const editMovieSchema = yup.object().shape({
    title: yup.string().min(3).required("Movie Title a required field"),
    moviePoster: yup.mixed(),
    movie: yup.mixed(),
    duration: yup.number().positive().min(0).required(),
    IMDB: yup.number().positive().min(0).required(),
    releaseDate: yup.date().required("Release Date is a required field"),
    categoryID: yup.string().required("Category is a required field"),
    qualityID: yup.string().required("Quality is a required field"),
    languageID: yup.string().required("Language is a required field"),
    desc: yup.string().min(30).required("Description is a required field"),
    trailerURL: yup.string().min(25).required("Trailer URL is a required field"),
    history: yup.string().min(40).required("History is a required field"),
});