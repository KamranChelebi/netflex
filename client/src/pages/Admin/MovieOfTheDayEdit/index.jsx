import React, { useEffect, useState } from "react";
import { editMovie, getOneMovie } from "../../../api/movieRequests";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { addMovieSchema } from "../../../validation/MovieAddValidation";
import { getLanguages } from "../../../api/requests";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useCategoryContext } from "../../../context/CategoriesContext";
import { useQualityContext } from "../../../context/QualitiesContext";
import { editMovieSchema } from "../../../validation/MovieEditValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { movieOfTheDaySchema } from "../../../validation/MovieOfTheDayValidation";
import {
  editMovieOfTheDay,
  getMovieOfTheDayByID,
} from "../../../api/movieOfTheDayRequests";
import moment from "moment";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MovieOfTheDayEdit = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [qualities, setQualities] = useQualityContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (!JSON.parse(localStorage.getItem("user")).isAdmin) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      IMDB: "",
      qualityID: "",
      desc: "",
      trailerURL: "",
    },
    validationSchema: movieOfTheDaySchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getMovieOfTheDayByID(id).then((data) => {
      setData(data);
      formik.values.title = data.title;
      formik.values.IMDB = data.IMDB;
      formik.values.qualityID = data.qualityID;
      formik.values.desc = data.desc;
      formik.values.trailerURL = data.trailerURL;
      setLoading(false);
    });
  }, [setData]);

  function handleSubmit(values, actions) {
    editMovieOfTheDay(id, values);
    toast.success("Daily Movie edited successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/admin/movieoftheday");
    actions.resetForm();
    actions.setSubmitting(true);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Edit Movie Of The Day</title>
        </Helmet>
      </HelmetProvider>
      {loading ? (
        <section id="loader">
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>
          </div>
        </section>
      ) : (
        <section id="add-movie" style={{ minHeight: "92vh" }}>
          <div className="container">
            <form style={{ width: "450px" }} onSubmit={formik.handleSubmit}>
              <h2>Edit Movie Of The Day</h2>
              <TextField
                error={
                  formik.touched.title && formik.errors.title ? true : false
                }
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
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.title}
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
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.IMDB}
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
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.desc}
                </p>
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
              <Button
                style={{ marginTop: "20px", width: "200px" }}
                variant="contained"
                color="success"
                type="submit"
              >
                Edit
              </Button>
              <p style={{ marginTop: "20px", marginBottom: "0" }}>
                Last Update: {moment(data.updateDate).format("LLL")}
              </p>
            </form>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default MovieOfTheDayEdit;
