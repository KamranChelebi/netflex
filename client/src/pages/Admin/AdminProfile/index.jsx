import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editUser, getUserByID } from "../../../api/authRequests";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { UpdatePasswordSchema } from "../../../validation/UpdatePassword";
import { useUserContext } from "../../../context/userContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
const SUPPORTED_FORMATS = ["jpg", "png", "jpeg"];

const AdminProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useUserContext();
  const [usernameMessage, setUsernameMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [imageMessage, setImageMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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

  setTimeout(() => {
    setUsernameMessage(null);
    setPasswordMessage(null);
    setImageMessage(null);
  }, "10000");

  const UsernameSchema = yup.object().shape({
    username: yup.string().min(5).required(),
  });
  const UserIMGSchema = yup.object().shape({
    userIMG: yup
      .mixed()
      .test(
        "FILE_TYPE",
        "Invalid file format selected",
        (value) => value && SUPPORTED_FORMATS.includes(value.split(".")[1])
      )
      .required("Image is a required field"),
  });

  const formik3 = useFormik({
    initialValues: {
      userIMG: "",
    },
    validationSchema: UserIMGSchema,
    onSubmit: handleSubmit3,
  });

  const formik2 = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: handleSubmit2,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: UsernameSchema,
    onSubmit: handleSubmit1,
  });

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (user.username) {
      formik.values.username = user.username;
      setLoading(false);
    }
  }, [user.username]);

  async function handleSubmit1(values, actions) {
    const response = await editUser(user.id, values);
    if (response.data.auth) {
      setUser((user.username = values.username));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUsernameMessage(response.data.message);
    }
    actions.setSubmitting(true);
    actions.resetForm();
  }

  async function handleSubmit2(values, actions) {
    const response = await editUser(user.id, values);
    if (response.data.auth) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/admin");
    } else {
      setPasswordMessage(response.data.message);
    }
    actions.setSubmitting(true);
    actions.resetForm();
  }
  async function handleSubmit3(values, actions) {
    const formData = new FormData();
    formData.append("userIMG", selectedImage);
    const response = await editUser(user.id, formData);
    if (response.data.auth) {
      getUserByID(user.id).then((data) => {
        setUser((user.userIMG = data.userIMG));
        localStorage.setItem("user", JSON.stringify(user));
      });
    }
    setSelectedImage(null);
    setImageMessage(response.data.message);
    actions.setSubmitting(true);
    actions.resetForm();
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin Profile</title>
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
        <>
          <section id="admin-profile">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="img">
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      src={
                        user.userIMG
                          ? user.userIMG
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86yDtDbrPbacDIiDqqw1XzpPklqLKqcVM5g&usqp=CAU"
                      }
                      alt="user"
                    />
                    {user.userIMG ? (
                      <button
                        onClick={async () => {
                          const formData = new FormData();
                          setSelectedImage(null);
                          formData.append("userIMGDelete", selectedImage);
                          const response = await editUser(user.id, formData);
                          if (response.data.auth) {
                            setUser((prevUser) => ({
                              ...prevUser,
                              userIMG: null,
                            }));
                            const updatedUser = {
                              ...user,
                              userIMG: null,
                            };
                            localStorage.setItem(
                              "user",
                              JSON.stringify(updatedUser)
                            );
                          }
                          setImageMessage(response.data.message);
                        }}
                        className="img-delete"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <form
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      padding: "0 10px",
                    }}
                    onSubmit={formik3.handleSubmit}
                  >
                    <input
                      className="img-input"
                      value={formik3.values.imageURL}
                      onChange={(e) => {
                        formik3.handleChange(e);
                        setSelectedImage(e.target.files[0]);
                      }}
                      onBlur={formik3.handleBlur}
                      type="file"
                      name="userIMG"
                      id="userIMG"
                      style={{ width: "100%", marginTop: "30px" }}
                      accept=".jpg, .png, .jpeg"
                    />
                    {formik3.errors.userIMG && formik3.touched.userIMG && (
                      <span style={{ color: "#DC1A28" }}>
                        {formik3.errors.userIMG}
                      </span>
                    )}
                    {imageMessage ? (
                      <span className="message" style={{ color: "#DC1A28" }}>
                        {imageMessage}
                      </span>
                    ) : (
                      ""
                    )}
                    <button
                      style={{ marginTop: "20px" }}
                      className="btn"
                      type="submit"
                    >
                      Add Avatar
                    </button>
                  </form>
                </div>
                <div className="col-lg-9">
                  <div className="form">
                    <form
                      style={{
                        paddingBottom: "30px",
                        marginTop: "30px",
                        borderBottom: "1px solid #DC1A28",
                      }}
                      onSubmit={formik.handleSubmit}
                    >
                      <TextField
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        type="text"
                        name="username"
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                      {formik.errors.username && formik.touched.username && (
                        <span style={{ color: "#DC1A28" }}>
                          {formik.errors.username}
                        </span>
                      )}
                      {usernameMessage ? (
                        <span className="message" style={{ color: "#DC1A28" }}>
                          {usernameMessage}
                        </span>
                      ) : (
                        ""
                      )}
                      <button
                        style={{
                          marginTop: "30px",
                        }}
                        type="submit"
                        className="btn"
                      >
                        Edit Username
                      </button>
                    </form>
                    <p className="email">Email: {user.email}</p>
                    <p className="plan">
                      Membership: {user.plan ? user.plan : "None"}
                    </p>
                    <form
                      style={{
                        paddingTop: "30px",
                        marginTop: "30px",
                        borderTop: "1px solid #DC1A28",
                      }}
                      onSubmit={formik2.handleSubmit}
                    >
                      <TextField
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.currentPassword}
                        name="currentPassword"
                        id="outlined-basic"
                        label="Current Password"
                        variant="outlined"
                        type="password"
                        style={{ width: "100%" }}
                      />
                      {formik2.errors.currentPassword &&
                        formik2.touched.currentPassword && (
                          <span style={{ color: "#DC1A28" }}>
                            {formik2.errors.currentPassword}
                          </span>
                        )}
                      <TextField
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.newPassword}
                        name="newPassword"
                        id="outlined-basic"
                        label="New Password"
                        variant="outlined"
                        type="password"
                        style={{ marginTop: "30px", width: "100%" }}
                      />
                      {formik2.errors.newPassword &&
                        formik2.touched.newPassword && (
                          <span style={{ color: "#DC1A28" }}>
                            {formik2.errors.newPassword}
                          </span>
                        )}
                      <TextField
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.confirmPassword}
                        name="confirmPassword"
                        id="outlined-basic"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        style={{ marginTop: "30px", width: "100%" }}
                      />
                      {formik2.errors.confirmPassword &&
                        formik2.touched.confirmPassword && (
                          <span style={{ color: "#DC1A28" }}>
                            {formik2.errors.confirmPassword}
                          </span>
                        )}
                      <span style={{ marginTop: "30px" }}>
                        {passwordMessage}
                      </span>
                      <button
                        style={{ marginTop: "30px", width: "200px" }}
                        type="submit"
                        className="btn"
                      >
                        Edit Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AdminProfile;
