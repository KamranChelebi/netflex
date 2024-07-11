import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { ServiceSchema } from "../../../validation/ServiceValidation";
import { postService } from "../../../api/servicesRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ServiceAdd = () => {
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
      iconClass: "",
      desc: "",
    },
    validationSchema: ServiceSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values, actions) {
    postService(values);
    toast.success("Service posted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/admin/services");
    actions.resetForm();
    actions.setSubmitting(true);
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Service</title>
        </Helmet>
      </HelmetProvider>
      <section
        style={{
          padding: "184px 0",
          backgroundImage:
            "url(https://c4.wallpaperflare.com/wallpaper/102/156/926/dark-black-and-white-abstract-black-background-wallpaper-preview.jpg)",
        }}
      >
        <div className="container">
          <form
            style={{ width: "400px", padding: "30px", margin: "0 auto" }}
            className="d-flex align-items-center justify-content-center flex-column bg-light"
            onSubmit={formik.handleSubmit}
          >
            <h2 style={{ fontWeight: "600" }}>Add Service</h2>
            <TextField
              name="title"
              id="standard-basic"
              label="Title"
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
            <TextField
              name="iconClass"
              id="standard-basic"
              label="Icon Class"
              variant="standard"
              type="text"
              style={{ width: "300px", marginTop: "30px" }}
              value={formik.values.iconClass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.iconClass && formik.touched.iconClass
                  ? true
                  : false
              }
            />
            {formik.errors.iconClass && formik.touched.iconClass && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.iconClass}
              </p>
            )}
            <TextField
              name="desc"
              id="standard-basic"
              label="Description"
              variant="standard"
              type="text"
              style={{ width: "300px", marginTop: "30px" }}
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.desc && formik.touched.desc ? true : false}
            />
            {formik.errors.desc && formik.touched.desc && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.desc}</p>
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

export default ServiceAdd;
