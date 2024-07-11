import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { editSocial, getSocialByID } from "../../../api/socialsRequests";
import { SocialsSchema } from "../../../validation/SocialsValidation";
import { Helmet, HelmetProvider } from "react-helmet-async";

const EditSocial = () => {
  const [loading, setLoading] = useState(true);
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
      icon: "",
      link: "",
    },
    validationSchema: SocialsSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getSocialByID(id).then((data) => {
      formik.values.icon = data.icon;
      formik.values.link = data.link;
      setLoading(false);
    });
  }, []);

  function handleSubmit(values, actions) {
    editSocial(id, values);
    toast.success("Social edited successfully!", {
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
          <title>Edit Social</title>
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
            padding: "208px 0",
            backgroundImage:
              "url(https://wallpaperswide.com/download/basement-wallpaper-1152x720.jpg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <form
              style={{ width: "390px", padding: "30px", margin: "0 auto" }}
              className="d-flex align-items-center justify-content-center flex-column bg-light"
              onSubmit={formik.handleSubmit}
            >
              <h2 style={{ fontWeight: "600" }}>Edit Social</h2>
              <TextField
                name="icon"
                id="standard-basic"
                label="Icon Class"
                variant="standard"
                type="text"
                style={{ width: "300px", marginTop: "30px" }}
                value={formik.values.icon}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.icon && formik.touched.icon ? true : false}
              />
              {formik.errors.icon && formik.touched.icon && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.icon}
                </p>
              )}
              <TextField
                name="link"
                id="standard-basic"
                label="Link"
                variant="standard"
                type="text"
                style={{ width: "300px", marginTop: "30px" }}
                value={formik.values.link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.link && formik.touched.link ? true : false}
              />
              {formik.errors.link && formik.touched.link && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.link}
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

export default EditSocial;
