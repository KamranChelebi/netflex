import React, { useEffect, useState } from "react";
import "./index.scss";
import { Box, Card, CardContent, CardMedia, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { getQualities } from "../../../api/requests";
import { getAllMovies } from "../../../api/movieRequests";
import { motion } from "framer-motion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  margin: "auto auto",
  height: "70%",
  transform: "translate(-50%, -50%)",
};

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies([...data.sort((x, y) => y.IMDB - x.IMDB)]);
      setMoviesCopy([...data.sort((x, y) => y.IMDB - x.IMDB)]);
    });
  }, [setMovies]);

  useEffect(() => {
    getQualities().then((data) => {
      setQualities(data);
    });
  }, [setQualities]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <section id="top-rated">
      <div className="container">
        <div className="section-title">
          <span>top rated</span>
          <h2>Top Rated Movies</h2>
        </div>
        <div className="sort-btns text-center" style={{ marginBottom: "40px" }}>
          <button
            className={activeButton === null ? "active" : ""}
            onClick={() => {
              handleButtonClick(null);
              setMovies(moviesCopy);
            }}
            id="sort-btn"
          >
            All Movies
          </button>
          <button
            className={activeButton === "movies" ? "active" : ""}
            onClick={() => {
              handleButtonClick("movies");
              setMovies(
                moviesCopy.filter(
                  (x) => x.categoryID != "648d79d9f1a9255f6ede5f9c"
                )
              );
            }}
            id="sort-btn"
          >
            Movies
          </button>
          <button
            className={
              activeButton === "648d79d9f1a9255f6ede5f9c" ? "active" : ""
            }
            onClick={() => {
              handleButtonClick("648d79d9f1a9255f6ede5f9c");
              setMovies(
                moviesCopy.filter(
                  (x) => x.categoryID == "648d79d9f1a9255f6ede5f9c"
                )
              );
            }}
            id="sort-btn"
          >
            Animations
          </button>
        </div>
        <div className="row">
          {movies &&
            movies.slice(0, 8).map((movie) => {
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
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
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
                        <i className="fa-solid fa-play play-icon"></i> Watch
                        Trailer
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
  );
};

export default TopRated;
