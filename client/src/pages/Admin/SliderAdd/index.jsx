import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SliderAddSchema } from "../../../validation/SliderAddValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { postSlider } from "../../../api/sliderRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SliderAdd = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const formik = useFormik({
    initialValues: {
      title: "",
      imageURL: "",
      trailerURL: "",
    },
    validationSchema: SliderAddSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values, actions) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("imageURL", selectedImage);
    formData.append("trailerURL", values.trailerURL);
    postSlider(formData);
    toast.success("Slider posted successfully!", {
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
      navigate("/admin/slider");
    }, 2000);
    actions.resetForm();
    actions.setSubmitting(true);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Slider</title>
        </Helmet>
      </HelmetProvider>
      <section
        style={{
          padding: "192px 0",
          backgroundImage:
            "url(https://c4.wallpaperflare.com/wallpaper/102/156/926/dark-black-and-white-abstract-black-background-wallpaper-preview.jpg)",
        }}
      >
        <div className="container">
          <form
            style={{ width: "370px", padding: "30px", margin: "0 auto" }}
            className="d-flex align-items-center justify-content-center flex-column bg-light"
            onSubmit={formik.handleSubmit}
          >
            <h2 style={{ fontWeight: "600" }}>Add Slider</h2>
            <TextField
              name="title"
              id="standard-basic"
              label="Slider Title"
              variant="standard"
              type="text"
              style={{ width: "300px" }}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.title && formik.touched.title ? true : false}
            />
            {formik.errors.title && formik.touched.title && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.title}</p>
            )}
            <label
              style={{ marginRight: "auto", marginTop: "25px" }}
              htmlFor="imageURL"
            >
              Slider Image
            </label>
            <input
              name="imageURL"
              id="imageURL"
              type="file"
              style={{ width: "300px" }}
              value={formik.values.imageURL}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedImage(e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
              accept=".jpg, .png, .jpeg"
            />
            {formik.errors.imageURL && formik.touched.imageURL && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.imageURL}
              </p>
            )}
            <TextField
              name="trailerURL"
              id="standard-basic"
              label="Trailer URL"
              variant="standard"
              type="text"
              style={{ width: "300px", marginTop: "15px" }}
              value={formik.values.trailerURL}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.trailerURL && formik.touched.trailerURL
                  ? true
                  : false
              }
            />
            {formik.errors.trailerURL && formik.touched.trailerURL && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.trailerURL}
              </p>
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

export default SliderAdd;
