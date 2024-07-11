import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { addMovieSchema } from "../../../validation/MovieAddValidation";
import { postMovie } from "../../../api/movieRequests";
import { useCategoryContext } from "../../../context/CategoriesContext";
import { useQualityContext } from "../../../context/QualitiesContext";
import { getLanguages } from "../../../api/requests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AddMovie = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useCategoryContext();
  const [qualities, setQualities] = useQualityContext();
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (!JSON.parse(localStorage.getItem("user")).isAdmin) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getLanguages().then((data) => {
      setLanguages(data);
    });
  }, [setLanguages]);

  const formik = useFormik({
    initialValues: {
      title: "",
      moviePoster: "",
      movie: "",
      duration: "",
      IMDB: "",
      releaseDate: "",
      categoryID: "",
      qualityID: "",
      languageID: "",
      desc: "",
      trailerURL: "",
      history: "",
    },
    validationSchema: addMovieSchema,
    onSubmit: handleSubmit,
  });
  function handleSubmit(values, actions) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("moviePoster", selectedImage);
    formData.append("movie", selectedVideo);
    formData.append("duration", values.duration);
    formData.append("IMDB", values.IMDB);
    formData.append("releaseDate", values.releaseDate);
    formData.append("categoryID", values.categoryID);
    formData.append("qualityID", values.qualityID);
    formData.append("languageID", values.languageID);
    formData.append("desc", values.desc);
    formData.append("trailerURL", values.trailerURL);
    formData.append("history", values.history);
    postMovie(formData);
    toast.success("Movie posted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate("/admin/movies");
    }, 3000);
    actions.resetForm();
    actions.setSubmitting(true);
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Movie</title>
        </Helmet>
      </HelmetProvider>
      <section id="add-movie">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <h2>Movie Add</h2>
            <TextField
              error={formik.touched.title && formik.errors.title ? true : false}
              style={{ marginTop: "20px", width: "300px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              type="text"
              name="title"
              id="standard-basic"
              label="Title"
              variant="standard"
            />
            {formik.errors.title && formik.touched.title && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.title}</p>
            )}
            <label
              style={{ marginTop: "30px", width: "300px" }}
              htmlFor="moviePoster"
            >
              Movie Poster
            </label>
            <input
              style={{ marginTop: "5px", width: "300px" }}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedImage(e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.moviePoster}
              type="file"
              name="moviePoster"
              id="moviePoster"
              variant="standard"
              accept=".jpg, .png, .jpeg"
            />
            {formik.errors.moviePoster && formik.touched.moviePoster && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.moviePoster}
              </p>
            )}
            <label
              style={{ marginTop: "30px", width: "300px" }}
              htmlFor="movie"
            >
              Movie
            </label>
            <input
              style={{ marginTop: "5px", width: "300px" }}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedVideo(e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.movie}
              type="file"
              name="movie"
              id="movie"
              variant="standard"
              accept=".mp4, .flv, .mov, .m4p"
            />
            {formik.errors.movie && formik.touched.movie && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.movie}</p>
            )}
            <TextField
              error={
                formik.touched.duration && formik.errors.duration ? true : false
              }
              style={{ marginTop: "20px", width: "300px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
              type="number"
              name="duration"
              id="standard-basic"
              label="Duration"
              variant="standard"
            />
            {formik.errors.duration && formik.touched.duration && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.duration}
              </p>
            )}
            <TextField
              error={formik.touched.IMDB && formik.errors.IMDB ? true : false}
              style={{ marginTop: "20px", width: "300px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.IMDB}
              type="number"
              name="IMDB"
              id="standard-basic"
              label="IMDB"
              variant="standard"
            />
            {formik.errors.IMDB && formik.touched.IMDB && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.IMDB}</p>
            )}
            <label
              style={{ marginTop: "30px", width: "300px" }}
              htmlFor="releaseDate"
            >
              Release Date
            </label>
            <TextField
              error={
                formik.touched.releaseDate && formik.errors.releaseDate
                  ? true
                  : false
              }
              style={{ marginTop: "5px", width: "300px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.releaseDate}
              type="date"
              name="releaseDate"
              id="standard-basic"
              variant="standard"
            />
            {formik.errors.releaseDate && formik.touched.releaseDate && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.releaseDate}
              </p>
            )}
            <Box sx={{ marginTop: "30px", minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  error={
                    formik.touched.categoryID && formik.errors.categoryID
                      ? true
                      : false
                  }
                >
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.categoryID}
                  label="Category"
                  name="categoryID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.categoryID && formik.errors.categoryID
                      ? true
                      : false
                  }
                >
                  <MenuItem value="">Category</MenuItem>
                  {categories &&
                    categories.map((x) => {
                      return (
                        <MenuItem key={x._id} value={x._id}>
                          {x.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            {formik.errors.categoryID && formik.touched.categoryID && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.categoryID}
              </p>
            )}
            <Box sx={{ marginTop: "30px", minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  error={
                    formik.touched.qualityID && formik.errors.qualityID
                      ? true
                      : false
                  }
                >
                  Quality
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.qualityID}
                  label="Quality"
                  name="qualityID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.qualityID && formik.errors.qualityID
                      ? true
                      : false
                  }
                >
                  <MenuItem value="">Quality</MenuItem>
                  {qualities &&
                    qualities.map((x) => {
                      return (
                        <MenuItem key={x._id} value={x._id}>
                          {x.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            {formik.errors.qualityID && formik.touched.qualityID && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.qualityID}
              </p>
            )}
            <Box sx={{ marginTop: "30px", minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  error={
                    formik.touched.languageID && formik.errors.languageID
                      ? true
                      : false
                  }
                >
                  Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.languageID}
                  label="Language"
                  name="languageID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.languageID && formik.errors.languageID
                      ? true
                      : false
                  }
                >
                  <MenuItem value="">Language</MenuItem>
                  {languages &&
                    languages.map((x) => {
                      return (
                        <MenuItem key={x._id} value={x._id}>
                          {x.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            {formik.errors.languageID && formik.touched.languageID && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.languageID}
              </p>
            )}
            <TextField
              error={formik.touched.desc && formik.errors.desc ? true : false}
              style={{ marginTop: "20px", width: "300px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desc}
              type="text"
              name="desc"
              id="standard-basic"
              label="Description"
              variant="standard"
            />
            {formik.errors.desc && formik.touched.desc && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.desc}</p>
            )}
            <TextField
              error={
                formik.touched.trailerURL && formik.errors.trailerURL
                  ? true
                  : false
              }
              style={{ marginTop: "20px", width: "300px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.trailerURL}
              type="text"
              name="trailerURL"
              id="standard-basic"
              label="Trailer URL"
              variant="standard"
            />
            {formik.errors.trailerURL && formik.touched.trailerURL && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.trailerURL}
              </p>
            )}
            <TextField
              error={
                formik.touched.history && formik.errors.history ? true : false
              }
              style={{ marginTop: "20px", width: "300px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.history}
              type="text"
              name="history"
              id="standard-basic"
              label="History"
              variant="standard"
            />
            {formik.errors.history && formik.touched.history && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.history}
              </p>
            )}
            <Button
              style={{ marginTop: "20px", width: "200px" }}
              variant="contained"
              color="success"
              type="submit"
            >
              Add
            </Button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default AddMovie;
