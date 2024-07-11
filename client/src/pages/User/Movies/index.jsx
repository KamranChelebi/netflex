import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { getLanguages } from "../../../api/requests";
import { getAllMovies } from "../../../api/movieRequests";
import { useCategoryContext } from "../../../context/CategoriesContext";
import { useQualityContext } from "../../../context/QualitiesContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  margin: "auto auto",
  height: "70%",
  transform: "translate(-50%, -50%)",
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [categories, setCategories] = useCategoryContext();
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [qualities, setQualities] = useQualityContext();
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");

  useEffect(() => {
    if (name) {
      getAllMovies(name).then((data) => {
        setMovies(data);
        setMoviesCopy(data);
        setLoading(false);
      });
    } else {
      getAllMovies().then((data) => {
        setMovies(data);
        setMoviesCopy(data);
        setLoading(false);
      });
    }
  }, [setMovies]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    if (category) {
      setMovies(moviesCopy.filter((x) => x.categoryID == category));
    } else {
      setMovies(moviesCopy);
    }
  }, [category]);

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  useEffect(() => {
    if (quality) {
      setMovies(moviesCopy.filter((x) => x.qualityID == quality));
    } else {
      setMovies(moviesCopy);
    }
  }, [quality]);

  useEffect(() => {
    getLanguages().then((data) => {
      setLanguages(data);
    });
  }, [setLanguages]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    if (language) {
      setMovies(moviesCopy.filter((x) => x.languageID == language));
    } else {
      setMovies(moviesCopy);
    }
  }, [language]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Movies</title>
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
                  Our <span>Movie</span>
                </h2>
                <nav>
                  <ul>
                    <li>
                      <Link style={{ color: "#DC1A28" }} to="/">
                        Home
                      </Link>
                    </li>
                    <li>Movies</li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section id="movies">
            <div className="container">
              <div className="search">
                <TextField
                  style={{ marginBottom: "30px", width: "300px" }}
                  onChange={(e) => {
                    getAllMovies(e.target.value).then((data) =>
                      setMovies(data)
                    );
                  }}
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  type="text"
                />
              </div>
              <div
                style={{ marginBottom: "60px" }}
                className="row align-items-center"
              >
                <div className="col-lg-6">
                  <div className="section-title">
                    <span>Movies</span>
                    <h2>New Release Movies</h2>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="selects">
                    <div className="category">
                      <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel id="demo-select-small-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={category}
                          style={{ textAlign: "left", color: "white" }}
                          label="Category"
                          onChange={handleCategoryChange}
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="">Category</MenuItem>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <MenuItem
                                  style={{ textTransform: "capitalize" }}
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="select-quality">
                      <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel id="demo-select-small-label">
                          Quality
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={quality}
                          style={{ textAlign: "left", color: "white" }}
                          label="Quality"
                          onChange={handleQualityChange}
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="">Quality</MenuItem>
                          {qualities &&
                            qualities.map((quality) => {
                              return (
                                <MenuItem key={quality._id} value={quality._id}>
                                  {quality.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="select-language">
                      <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel id="demo-select-small-label">
                          Language
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={language}
                          style={{ textAlign: "left", color: "white" }}
                          label="Language"
                          onChange={handleLanguageChange}
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="">Language</MenuItem>
                          {languages &&
                            languages.map((language) => {
                              return (
                                <MenuItem
                                  key={language._id}
                                  value={language._id}
                                >
                                  {language.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {movies &&
                  movies.map((movie) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        layout
                        key={movie._id}
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
                              alt={movie.title}
                              height="430"
                              image={movie.moviePoster}
                            />
                            <button
                              onClick={() => {
                                handleOpen();
                                setCurrentTrailer(movie.trailerURL);
                              }}
                              className="cardTrailerBTN"
                            >
                              <i className="fa-solid fa-play play-icon"></i>{" "}
                              Watch Trailer
                            </button>
                            <Link to={`/movies/${movie._id}`}>
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
                                to={`/movies/${movie._id}`}
                                className="movie-title"
                              >
                                {movie.title}
                              </Link>
                              <p
                                style={{
                                  color: "#DC1A28",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                                className="m-0"
                              >
                                {new Date(movie.releaseDate).getFullYear()}
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <p className="quality">
                                {qualities &&
                                  qualities.map((x) => {
                                    if (x._id == movie.qualityID) {
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
                                {movie.duration} min{" "}
                                <span style={{ marginLeft: "15px" }}>
                                  <i className="fa-solid fa-thumbs-up card-icon"></i>{" "}
                                  {movie.IMDB}
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

export default Movies;
