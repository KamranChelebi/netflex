import React, { useEffect, useState } from "react";
import "./index.scss";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../../../validation/LoginValidation";
import { UserLogin } from "../../../api/authRequests";
import { useUserContext } from "../../../context/userContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [user, setUser] = useUserContext();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (JSON.parse(localStorage.getItem("user")).isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, actions) {
    const response = await UserLogin(values);
    setMessage(response.data.message);
    if (response.data.user.isAdmin) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      navigate("/admin/dashboard");
    }
    actions.resetForm();
    actions.setSubmitting(true);
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin</title>
        </Helmet>
      </HelmetProvider>
      <section id="admin-login">
        <div className="container">
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <h1>Admin</h1>
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
                <span>
                  <Link to="/forgot-password">Forgot Password? </Link>
                </span>
                {formik.errors.password && formik.touched.password && (
                  <span style={{ marginBottom: "0", color: "#DC1A28" }}>
                    {formik.errors.password}
                  </span>
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
                Sing in
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminLogin;
