import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { postLanguage } from "../../../api/requests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MovieLanguageAdd = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (!JSON.parse(localStorage.getItem("user")).isAdmin) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  const LanguageNameSchema = yup.object().shape({
    name: yup.string().min(3).required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: LanguageNameSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values, actions) {
    postLanguage(values);
    toast.success("Language posted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/admin/movies-language");
    actions.resetForm();
    actions.setSubmitting(true);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Movie Language</title>
        </Helmet>
      </HelmetProvider>
      <section
        style={{
          padding: "262px 0",
          backgroundImage:
            "url(https://c4.wallpaperflare.com/wallpaper/102/156/926/dark-black-and-white-abstract-black-background-wallpaper-preview.jpg)",
        }}
      >
        <div className="container">
          <form
            style={{ width: "410px", padding: "30px", margin: "0 auto" }}
            className="d-flex align-items-center justify-content-center flex-column bg-light"
            onSubmit={formik.handleSubmit}
          >
            <h2 style={{ fontWeight: "600" }}>Add Movie Language</h2>
            <TextField
              name="name"
              id="standard-basic"
              label="Language Name"
              variant="standard"
              type="text"
              style={{ width: "300px" }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name && formik.touched.name ? true : false}
            />
            {formik.errors.name && formik.touched.name && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.name}</p>
            )}
            <Button
              style={{ width: "200px", display: "block", margin: "25px auto" }}
              color="success"
              variant="contained"
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

export default MovieLanguageAdd;
