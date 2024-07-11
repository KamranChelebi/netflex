import React, { useEffect, useState } from "react";
import "./index.scss";
import { Box, Card, CardContent, CardMedia, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { getQualities } from "../../../api/requests";
import { getAllMovies } from "../../../api/movieRequests";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  margin: "auto auto",
  height: "70%",
  transform: "translate(-50%, -50%)",
};

const TopWatched = () => {
  const [movies, setMovies] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  useEffect(() => {
    getAllMovies().then((data) => {
      const filtered = data.filter((x) => new Date(x.releaseDate) < new Date());
      setMovies([...filtered.sort((x, y) => y.viewCount - x.viewCount)]);
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
    <section id="top-watched">
      <div className="container">
        <div className="section-title">
          <span>top watched</span>
          <h2>Top Watched Movies</h2>
        </div>
        <div className="row">
          {movies &&
            movies.slice(0, 4).map((movie) => {
              return (
                <div
                  key={movie._id}
                  className="col-xl-3 col-lg-4 col-md-6 col-xs-12"
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
  );
};

export default TopWatched;
