import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useQualityContext } from "../../../context/QualitiesContext";
import { editUser } from "../../../api/authRequests";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  margin: "auto auto",
  height: "70%",
  transform: "translate(-50%, -50%)",
};

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [favoritesCopy, setFavoritesCopy] = useState([]);
  const [qualities, setQualities] = useQualityContext();
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
      setFavorites(JSON.parse(localStorage.getItem("user")).favorites);
      setFavoritesCopy(JSON.parse(localStorage.getItem("user")).favorites);
      setLoading(false);
    }
  }, [setUser, setFavorites]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Favorites</title>
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
          <section id="hero">
            <div className="container">
              <div className="breadcrumb-content text-center">
                <h2>
                  Your <span>Favorites</span>
                </h2>
                <nav>
                  <ul>
                    <li>
                      <Link style={{ color: "#DC1A28" }} to="/">
                        Home
                      </Link>
                    </li>
                    <li>Favorites</li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section id="favorites-page">
            <div className="container">
              <div className="search-clear d-flex align-items-center justify-content-between mb-5">
                <TextField
                  onChange={(e) => {
                    setFavorites(
                      favoritesCopy.filter((x) =>
                        x.title
                          .toLowerCase()
                          .trim()
                          .includes(e.target.value.toLowerCase().trim())
                      )
                    );
                  }}
                  id="outlined-basic"
                  label="Search"
                  type="text"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
                <button
                  onClick={async () => {
                    setFavorites([]);
                    setFavoritesCopy([]);
                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        ...user,
                        favorites: [],
                      })
                    );
                    await editUser(user.id, {
                      favorites: [],
                    });
                  }}
                  className="clearBTN"
                >
                  Clear All
                </button>
              </div>

              <div className="row">
                {favorites &&
                  favorites.map((item) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        layout
                        key={item._id}
                        className="col-xl-3 col-lg-4 col-sm-6"
                      >
                        <Card
                          className="movie-card"
                          sx={{
                            position: "relative",
                            width: "100%",
                            overflow: "hidden",
                            backgroundColor: "transparent",
                            boxShadow: "none",
                          }}
                        >
                          <button
                            onClick={async () => {
                              const updatedFavorites = favorites.filter(
                                (movie) => movie._id !== item._id
                              );
                              setFavoritesCopy(updatedFavorites);

                              setFavorites(updatedFavorites);
                              localStorage.setItem(
                                "user",
                                JSON.stringify({
                                  ...user,
                                  favorites: updatedFavorites,
                                })
                              );
                              await editUser(user.id, {
                                favorites: updatedFavorites,
                              });
                            }}
                            className="delete-favorite"
                          >
                            X
                          </button>
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
                      </motion.div>
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

export default Favorites;
