import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editUser, getUserByID } from "../../../api/authRequests";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { UpdatePasswordSchema } from "../../../validation/UpdatePassword";
import { useQualityContext } from "../../../context/QualitiesContext";
import { useUserContext } from "../../../context/UserContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
const SUPPORTED_FORMATS = ["jpg", "png", "jpeg"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  margin: "auto auto",
  height: "70%",
  transform: "translate(-50%, -50%)",
};

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useUserContext();
  const [favorites, setFavorites] = useState([]);
  const [usernameMessage, setUsernameMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [imageMessage, setImageMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [qualities, setQualities] = useQualityContext();
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
      .required("User Image is a required field"),
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
      setFavorites(JSON.parse(localStorage.getItem("user")).favorites);
    }
    if (user) {
      formik.values.username = user.username;
      setLoading(false);
    }
  }, [user, setUser]);

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
      navigate("/login");
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
          <title>Profile</title>
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
          <section id="profile">
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
          <section id="favorites">
            <div className="container">
              <div className="section-title">
                <span>Favorites</span>
                <Link to="/favorites">
                  <h2>Favorite Movies</h2>
                </Link>
              </div>
              <div className="row">
                {favorites &&
                  favorites.slice(0, 4).map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="col-xl-3 col-lg-4 col-sm-6"
                      >
                        <Card
                          className="movie-card"
                          sx={{
                            width: "100%",
                            backgroundColor: "transparent",
                            boxShadow: "none",
                          }}
                        >
                          <div className="moviePoster">
                            <CardMedia
                              style={{ marginBottom: "23px" }}
                              component="img"
                              alt={item.title}
                              height="430"
                              image={item.moviePoster}
                            />
                            <button
                              onClick={() => {
                                handleOpen();
                                setCurrentTrailer(item.trailerURL);
                              }}
                              className="cardTrailerBTN"
                            >
                              <i className="fa-solid fa-play play-icon"></i>{" "}
                              Watch Trailer
                            </button>
                            <Link to={`/movies/${item._id}`}>
                              <button className="cardDetailBTN">Detail</button>
                            </Link>
                          </div>
                          <CardContent
                            style={{
                              padding: "0 10px 0 0",
                              backgroundColor: "transparent",
                            }}
                          >
                            <div
                              style={{ marginBottom: "15px" }}
                              className="d-flex align-items-center justify-content-between"
                            >
                              <Link
                                to={`/movies/${item._id}`}
                                className="movie-title"
                              >
                                {item.title}
                              </Link>
                              <p
                                style={{
                                  color: "#DC1A28",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                                className="m-0"
                              >
                                {new Date(item.releaseDate).getFullYear()}
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <p className="quality">
                                {qualities &&
                                  qualities.map((x) => {
                                    if (x._id == item.qualityID) {
                                      return x.name;
                                    }
                                  })}
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  lineHeight: "12px",
                                  color: "white",
                                }}
                              >
                                <i className="fa-regular fa-clock card-icon"></i>{" "}
                                {item.duration} min{" "}
                                <span style={{ marginLeft: "15px" }}>
                                  <i className="fa-solid fa-thumbs-up card-icon"></i>{" "}
                                  {item.IMDB}
                                </span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box open={open} onClose={handleClose} sx={style}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentTrailer}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </Box>
                </Modal>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Profile;
