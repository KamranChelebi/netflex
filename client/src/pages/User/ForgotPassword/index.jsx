import React, { useState } from "react";
import "./index.scss";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { ForgotPasswordPost, UserRegister } from "../../../api/authRequests";
import * as yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ForgotPassword = () => {
  const [message, setMessage] = useState(null);

  const ForgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      )
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: handleSubmit,
  });

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }

  async function handleSubmit(values, actions) {
    const response = await ForgotPasswordPost(values);
    setMessage(response.data.message);
    actions.setSubmitting(true);
    actions.resetForm();
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
      </HelmetProvider>
      <section id="forgot">
        <div className="container">
          <div className="form">
            <form
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
              method="POST"
            >
              <h1>Forgot Password</h1>
              <div className="input">
                <TextField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Email"
                  name="email"
                  variant="outlined"
                  type="email"
                  required
                  error={
                    formik.errors.email && formik.touched.email ? true : false
                  }
                />
                {formik.errors.email && formik.touched.email && (
                  <p style={{ marginBottom: "0", color: "#DC1A28" }}>
                    {formik.errors.email}
                  </p>
                )}
              </div>
              {message ? (
                <div className="message">
                  <p>{message}</p>
                </div>
              ) : (
                ""
              )}
              <button className="registerBTN" type="submit">
                Send Link
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
