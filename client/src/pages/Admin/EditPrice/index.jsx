import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { ServiceSchema } from "../../../validation/ServiceValidation";
import { editService, getServiceByID } from "../../../api/servicesRequests";
import { useQualityContext } from "../../../context/QualitiesContext";
import { PricingSchema } from "../../../validation/PricingValidation";
import { editPrice, getPriceByID } from "../../../api/pricingRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const EditPrice = () => {
  const [loading, setLoading] = useState(true);
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
      planName: "",
      quality: "",
      price: "",
      qualityID: "",
      screenCount: "",
      downloadCount: "",
    },
    validationSchema: PricingSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getPriceByID(id).then((data) => {
      formik.values.planName = data.planName;
      formik.values.quality = data.quality;
      formik.values.price = data.price;
      formik.values.qualityID = data.qualityID;
      formik.values.screenCount = data.screenCount;
      formik.values.downloadCount = data.downloadCount;
      setLoading(false);
    });
  }, []);

  function handleSubmit(values, actions) {
    editPrice(id, values);
    toast.success("Service edited successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/admin/pricing");
    actions.resetForm();
    actions.setSubmitting(true);
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Edit Price</title>
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
            padding: "63px 0",
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
              <h2 style={{ fontWeight: "600" }}>Edit Price</h2>
              <TextField
                name="planName"
                id="standard-basic"
                label="Plan Name"
                variant="standard"
                type="text"
                style={{ width: "300px" }}
                value={formik.values.planName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.planName && formik.touched.planName
                    ? true
                    : false
                }
              />
              {formik.errors.planName && formik.touched.planName && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.planName}
                </p>
              )}
              <TextField
                name="quality"
                id="standard-basic"
                label="Quality"
                variant="standard"
                type="text"
                style={{ width: "300px", marginTop: "30px" }}
                value={formik.values.quality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.quality && formik.touched.quality ? true : false
                }
              />
              {formik.errors.quality && formik.touched.quality && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.quality}
                </p>
              )}
              <TextField
                name="price"
                id="standard-basic"
                label="Price"
                variant="standard"
                type="number"
                style={{ width: "300px", marginTop: "30px" }}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.price && formik.touched.price ? true : false
                }
              />
              {formik.errors.price && formik.touched.price && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.price}
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
                name="screenCount"
                id="standard-basic"
                label="Screen Count"
                variant="standard"
                type="number"
                style={{ width: "300px", marginTop: "30px" }}
                value={formik.values.screenCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.screenCount && formik.touched.screenCount
                    ? true
                    : false
                }
              />
              {formik.errors.screenCount && formik.touched.screenCount && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.screenCount}
                </p>
              )}
              <TextField
                name="downloadCount"
                id="standard-basic"
                label="Download Count"
                variant="standard"
                type="number"
                style={{ width: "300px", marginTop: "30px" }}
                value={formik.values.downloadCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.downloadCount && formik.touched.downloadCount
                    ? true
                    : false
                }
              />
              {formik.errors.downloadCount && formik.touched.downloadCount && (
                <p style={{ color: "red", margin: "0" }}>
                  {formik.errors.downloadCount}
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

export default EditPrice;
