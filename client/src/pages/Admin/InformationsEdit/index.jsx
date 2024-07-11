import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import {
  editInformation,
  getInformationByID,
} from "../../../api/informationRequests";
import { InformationsEditSchema } from "../../../validation/InformationsEditValidation";
import moment from "moment";
import { Helmet, HelmetProvider } from "react-helmet-async";

const InformationsEdit = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [informations, setInformations] = useState({});
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
      logoIMG: "",
      address: "",
      phone: "",
      email: "",
      iframe: "",
    },
    validationSchema: InformationsEditSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getInformationByID(id).then((data) => {
      setInformations(data);
      formik.values.address = data.address;
      formik.values.phone = data.phone;
      formik.values.email = data.email;
      formik.values.iframe = data.iframe;
      setLoading(false);
    });
  }, [setInformations]);

  function handleSubmit(values, actions) {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("logoIMG", selectedImage);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("iframe", values.iframe);
      editInformation(id, formData);
    } else {
      values.logoIMG = informations.logoIMG;
      editInformation(id, values);
    }
    navigate("/admin/informations");
    toast.success("Information edited successfully!", {
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
          <title>Informations Edit</title>
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
            padding: "101px 0",
            backgroundImage:
              "url(https://wallpaperswide.com/download/basement-wallpaper-1152x720.jpg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <form
              style={{ width: "400px", padding: "30px", margin: "0 auto" }}
              className="d-flex align-items-center justify-content-center flex-column bg-light"
              onSubmit={formik.handleSubmit}
            >
              <h2 style={{ fontWeight: "600" }}>Edit Informations</h2>

              <label
                style={{ margin: "20px auto 10px 20px" }}
                htmlFor="logoIMG"
              >
                Logo Image
              </label>
              <input
                name="logoIMG"
                id="logoIMG"
                type="file"
                style={{ width: "300px" }}
                value={formik.values.logoIMG}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedImage(e.target.files[0]);
                }}
                onBlur={formik.handleBlur}
                accept=".jpg, .png, .jpeg"
              />
              {formik.errors.logoIMG && formik.touched.logoIMG && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.logoIMG}
                </p>
              )}
              <TextField
                name="address"
                id="standard-basic"
                label="Address"
                variant="standard"
                type="text"
                style={{ width: "300px", marginTop: "30px" }}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.address && formik.touched.address ? true : false
                }
              />
              {formik.errors.address && formik.touched.address && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.address}
                </p>
              )}
              <TextField
                name="phone"
                id="standard-basic"
                label="Phone"
                variant="standard"
                type="text"
                style={{ width: "300px", marginTop: "15px" }}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.phone && formik.touched.phone ? true : false
                }
              />
              {formik.errors.phone && formik.touched.phone && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.phone}
                </p>
              )}
              <TextField
                name="email"
                id="standard-basic"
                label="Email"
                variant="standard"
                type="text"
                style={{ width: "300px", marginTop: "15px" }}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.email && formik.touched.email ? true : false
                }
              />
              {formik.errors.email && formik.touched.email && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.email}
                </p>
              )}
              <TextField
                name="iframe"
                id="standard-basic"
                label="Location SRC"
                variant="standard"
                type="text"
                style={{ width: "300px", marginTop: "15px" }}
                value={formik.values.iframe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.iframe && formik.touched.iframe ? true : false
                }
              />
              {formik.errors.iframe && formik.touched.iframe && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.iframe}
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
              <p style={{ marginTop: "20px", marginBottom: "0" }}>
                Last Update: {moment(informations.updateDate).format("LLL")}
              </p>
            </form>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default InformationsEdit;
