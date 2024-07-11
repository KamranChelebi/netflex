import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { postSocial } from "../../../api/socialsRequests";
import { SocialsSchema } from "../../../validation/SocialsValidation";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AddSocial = () => {
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
      icon: "",
      link: "",
    },
    validationSchema: SocialsSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values, actions) {
    postSocial(values);
    console.log("slam");
    toast.success("Social posted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/admin/socials");
    actions.resetForm();
    actions.setSubmitting(true);
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Social</title>
        </Helmet>
      </HelmetProvider>
      <section
        style={{
          padding: "213px 0",
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
            <h2 style={{ fontWeight: "600" }}>Add Social Link</h2>
            <TextField
              name="icon"
              id="standard-basic"
              label="Icon Class"
              variant="standard"
              type="text"
              style={{ width: "300px", marginTop: "20px" }}
              value={formik.values.icon}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.icon && formik.touched.icon ? true : false}
            />
            {formik.errors.icon && formik.touched.icon && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.icon}</p>
            )}
            <TextField
              name="link"
              id="standard-basic"
              label="URL Link"
              variant="standard"
              type="text"
              style={{ width: "300px", marginTop: "30px" }}
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.link && formik.touched.link ? true : false}
            />
            {formik.errors.link && formik.touched.link && (
              <p style={{ color: "red", margin: "0" }}>{formik.errors.link}</p>
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

export default AddSocial;
