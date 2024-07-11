import * as yup from "yup";
const SUPPORTED_FORMATS = ["jpg", "png", "jpeg"];
const VIDEO__SUPPORTED__FORMATS = ["mp4", "flv", "mov", "m4p"];


export const addMovieSchema = yup.object().shape({
    title: yup.string().min(3).required("Movie Title a required field"),
    moviePoster: yup.mixed()
        .test("FILE_TYPE", "Invalid file format selected", (value) => value && SUPPORTED_FORMATS.includes(value.split('.')[1])).required("Movie Poster is a required field"),
    movie: yup.mixed().required("Movie is a required field")
        .test("FILE_TYPE", "Invalid file format selected", (value) => value && VIDEO__SUPPORTED__FORMATS.includes(value.split('.')[1])),
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