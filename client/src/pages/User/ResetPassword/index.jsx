import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { ResetPasswordPut } from "../../../api/authRequests";
import { useNavigate } from "react-router-dom";
import { ResetPasswordSchema } from "../../../validation/ResetPasswordValidation";
import { Helmet, HelmetProvider } from "react-helmet-async";

const PASSWORD_RULES = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const ResetPassword = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (localStorage.getItem("user") || !token) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: handleSubmit,
  });

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  }

  async function handleSubmit(values, actions) {
    const user = {
      password: values.password,
    };
    const response = await ResetPasswordPut(token, user);
    setMessage(response.data.message);
    values.confirmPassword = "";
    actions.setSubmitting(true);
    navigate("/login");
    actions.resetForm();
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Reset Password</title>
        </Helmet>
      </HelmetProvider>
      <section id="reset">
        <div className="container">
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <h1>Reset Password</h1>

              <div className="input">
                <TextField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Password"
                  name="password"
                  variant="outlined"
                  type="password"
                  required
                  error={
                    formik.errors.password && formik.touched.password
                      ? true
                      : false
                  }
                />
                {formik.errors.password && formik.touched.password && (
                  <p style={{ marginBottom: "0", color: "#DC1A28" }}>
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="input">
                <TextField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Confirm Password"
                  name="confirmPassword"
                  variant="outlined"
                  type="password"
                  required
                  error={
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? true
                      : false
                  }
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p style={{ marginBottom: "0", color: "#DC1A28" }}>
                      {formik.errors.confirmPassword}
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
                Reset
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
