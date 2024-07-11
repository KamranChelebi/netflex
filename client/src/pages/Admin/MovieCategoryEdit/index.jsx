import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { editCategory, getCategoryByID } from "../../../api/categoryRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MovieCategoryEdit = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
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

  const CategoryEditSchema = yup.object().shape({
    name: yup.string().min(3).required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CategoryEditSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getCategoryByID(id).then((data) => {
      setCategory(data);
      formik.values.name = data.name;
      setLoading(false);
    });
  }, [setCategory]);

  function handleSubmit(values, actions) {
    editCategory(id, values);
    navigate("/admin/movies-category");
    toast.success("Category edited successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    actions.resetForm();
    actions.setSubmitting(true);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Edit Movie Category</title>
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
            padding: "262px 0",
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
              <h2 style={{ fontWeight: "600" }}>Edit Category Name</h2>
              <TextField
                name="name"
                id="standard-basic"
                label="Category Name"
                variant="standard"
                type="text"
                style={{ width: "300px" }}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.name && formik.touched.name ? true : false}
              />
              {formik.errors.name && formik.touched.name && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.name}
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

export default MovieCategoryEdit;
