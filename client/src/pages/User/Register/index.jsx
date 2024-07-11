import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { RegisterSchema } from "../../../validation/RegisterValidation";
import { UserRegister } from "../../../api/authRequests";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Register = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, actions) {
    const user = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    const response = await UserRegister(user);
    setMessage(response.data.message);
    values.confirmPassword = "";
    actions.setSubmitting(true);
    actions.resetForm();
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Register</title>
        </Helmet>
      </HelmetProvider>
      <section id="register">
        <div className="container">
          <div className="form">
            <form
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
              method="POST"
            >
              <h1>Register</h1>
              <div className="input">
                <TextField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Username"
                  name="username"
                  variant="outlined"
                  type="text"
                  required
                  error={
                    formik.errors.username && formik.touched.username
                      ? true
                      : false
                  }
                />
                {formik.errors.username && formik.touched.username && (
                  <p style={{ marginBottom: "0", color: "#DC1A28" }}>
                    {formik.errors.username}
                  </p>
                )}
              </div>

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
                Sing up
              </button>
              <span className="goLogin">
                Do you have an account? <Link to="/login">Click here</Link>
              </span>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
