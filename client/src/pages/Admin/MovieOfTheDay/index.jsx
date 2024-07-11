import React, { useEffect, useState } from "react";
import { getMovieOfTheDay } from "../../../api/movieOfTheDayRequests";
import { getQualities } from "../../../api/requests";
import { Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

const MovieOfTheDay = () => {
  const [movie, setMovie] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
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

  useEffect(() => {
    getMovieOfTheDay().then((data) => {
      setMovie(data);
    });
  }, [setMovie]);

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
    <>
      <HelmetProvider>
        <Helmet>
          <title>Movie Of The Day</title>
        </Helmet>
      </HelmetProvider>
      <section id="movie-ofDay" style={{ paddingTop: "40px" }}>
        <div className="container">
          {movie &&
            movie.map((item) => {
              return (
                <Button
                  key={item._id}
                  onClick={() => {
                    navigate(`/admin/movieoftheday/${item._id}`);
                  }}
                  color="success"
                  variant="contained"
                  style={{ fontSize: "17px" }}
                >
                  edit movie of the day
                </Button>
              );
            })}

          <div
            style={{ paddingTop: "80px" }}
            className="row align-items-center"
          >
            <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
              <div className="section-title">
                <span>Movie of The Day</span>
              </div>
              {movie &&
                movie.map((item) => {
                  return (
                    <div key={item._id}>
                      <h2>{item.title}</h2>
                      <div className="content">
                        <p>{item.desc}</p>
                        <div className="d-flex" style={{ margin: "30px 0" }}>
                          <p className="quality">
                            {qualities &&
                              qualities.map((x) => {
                                if (x._id == item.qualityID) {
                                  return x.name;
                                }
                              })}
                          </p>
                          <p className="IMDB">
                            {item.IMDB} <i className="fa-solid fa-star"></i>
                            <span
                              style={{
                                display: "block",
                                marginBottom: 0,
                                marginLeft: "5px",
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "#1e1b29",
                                lineHeight: 1,
                              }}
                            >
                              IMDB
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            handleOpen();
                            setCurrentTrailer(item.trailerURL);
                          }}
                          className="trailerBTN"
                        >
                          <i className="fa-solid fa-play play-icon"></i> Watch
                          Trailer
                        </button>
                      </div>
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
            <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12">
              <div className="img">
                <img
                  src="https://themebeyond.com/html/movflx/img/images/live_img.png"
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieOfTheDay;
