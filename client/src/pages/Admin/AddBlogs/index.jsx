import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addBlogSchema } from "../../../validation/BlogsAddValidation";
import { getAllBlogCategories, postBlog } from "../../../api/blogRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AddBlogs = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (!JSON.parse(localStorage.getItem("user")).isAdmin) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
    getAllBlogCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      imageURL: "",
      firstDesc: "",
      secondDesc: "",
      categoryID: "",
    },
    validationSchema: addBlogSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values, actions) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("imageURL", selectedImage);
    formData.append("firstDesc", values.firstDesc);
    formData.append("secondDesc", values.secondDesc);
    formData.append("categoryID", values.categoryID);
    postBlog(formData);
    navigate("/admin/blogs");
    toast.success("Blog posted successfully!", {
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
          <title>Add Blog</title>
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
            style={{ width: "400px", padding: "30px", margin: "0 auto" }}
            className="d-flex align-items-center justify-content-center flex-column bg-light"
            onSubmit={formik.handleSubmit}
          >
            <h2 style={{ fontWeight: "600" }}>Add Blog</h2>
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
            <label style={{ margin: "20px auto 10px 20px" }} htmlFor="imageURL">
              Blog Image
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
              name="firstDesc"
              id="standard-basic"
              label="First Description"
              variant="standard"
              type="text"
              style={{ width: "300px", marginTop: "15px" }}
              value={formik.values.firstDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.firstDesc && formik.touched.firstDesc
                  ? true
                  : false
              }
            />
            {formik.errors.firstDesc && formik.touched.firstDesc && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.firstDesc}
              </p>
            )}
            <TextField
              name="secondDesc"
              id="standard-basic"
              label="Second Description"
              variant="standard"
              type="text"
              style={{ width: "300px", marginTop: "15px" }}
              value={formik.values.secondDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.secondDesc && formik.touched.secondDesc
                  ? true
                  : false
              }
            />
            {formik.errors.secondDesc && formik.touched.secondDesc && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.secondDesc}
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

export default AddBlogs;
