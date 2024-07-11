import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { editSlider, getSliderByID } from "../../../api/sliderRequests";
import * as yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SliderEdit = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slider, setSlider] = useState({});
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

  const SliderEditSchema = yup.object().shape({
    title: yup.string().min(5).required(),
    imageURL: yup.mixed(),
    trailerURL: yup.string().min(5).required(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      imageURL: "",
      trailerURL: "",
    },
    validationSchema: SliderEditSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getSliderByID(id).then((data) => {
      setSlider(data);
      formik.values.title = data.title;
      formik.values.trailerURL = data.trailerURL;
      setLoading(false);
    });
  }, [setSlider]);

  function handleSubmit(values, actions) {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("imageURL", selectedImage);
      formData.append("trailerURL", values.trailerURL);
      editSlider(id, formData);
    } else {
      values.imageURL = slider.imageURL;
      editSlider(id, values);
    }
    toast.success("Slider edited successfully!", {
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
          <title>Edit Slider</title>
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
        <section
          style={{
            padding: "192px 0",
            backgroundImage:
              "url(https://wallpaperswide.com/download/basement-wallpaper-1152x720.jpg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <form
              style={{ width: "350px", padding: "30px", margin: "0 auto" }}
              className="d-flex align-items-center justify-content-center flex-column bg-light"
              onSubmit={formik.handleSubmit}
            >
              <h2 style={{ fontWeight: "600" }}>Edit Slider</h2>
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
                error={
                  formik.errors.title && formik.touched.title ? true : false
                }
              />
              {formik.errors.title && formik.touched.title && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.title}
                </p>
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
                style={{
                  width: "200px",
                  display: "block",
                  margin: "25px auto",
                }}
                color="success"
                variant="contained"
                type="submit"
              >
                Edit
              </Button>
            </form>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default SliderEdit;
