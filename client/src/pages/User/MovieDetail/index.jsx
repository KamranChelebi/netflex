import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editMovie, getOneMovie } from "../../../api/movieRequests";
import { useQualityContext } from "../../../context/QualitiesContext";
import { useCategoryContext } from "../../../context/CategoriesContext";
import { Box, Card, CardContent, CardMedia, Modal } from "@mui/material";
import { getLanguages } from "../../../api/requests";
import { useMovieContext } from "../../../context/MovieContext";
import { editUser } from "../../../api/authRequests";
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

const MovieDetail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [user, setUser] = useState({});
  const [qualities, setQualities] = useQualityContext();
  const [categories, setCategories] = useCategoryContext();
  const [languages, setLanguages] = useState([]);
  const [movies, setMovies] = useMovieContext();
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [active, setActive] = useState(null);
  const [favs, setFavs] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
      setFavs(JSON.parse(localStorage.getItem("user")).favorites);
    }
  }, [setUser]);

  useEffect(() => {
    getOneMovie(id, token).then((data) => {
      if (data) {
        setMovie(data);
        if (new Date(data.releaseDate) < new Date()) {
          editMovie(id, { viewCount: data.viewCount + 1 });
        }
        setLoading(false);
      } else {
        navigate("/");
      }
    });
  }, [id, token]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      JSON.parse(localStorage.getItem("user")).favorites &&
        JSON.parse(localStorage.getItem("user")).favorites.map((item) => {
          if (item._id == id) {
            setActive("active");
          }
        });
    }
  }, []);

  if (!token) {
    navigate("/login");
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getLanguages().then((data) => {
      setLanguages(data);
    });
  }, [setLanguages]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Movie Detail</title>
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
          <section id="movie-detail">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4">
                  <div className="movie-poster">
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        boxShadow: "0 20px 30px 0 rgba(0,0,0,.8)",
                      }}
                      src={movie.moviePoster}
                      alt={movie.title}
                    />
                  </div>
                </div>
                <div className="col-xl-7 col-lg-8">
                  <div className="movie-content">
                    <h2>{movie.title}</h2>
                    <div className="info">
                      <ul>
                        <li>
                          {qualities &&
                            qualities.map((x) => {
                              if (x._id == movie.qualityID) {
                                return (
                                  <span className="quality" key={x._id}>
                                    {x.name}
                                  </span>
                                );
                              }
                            })}
                        </li>
                        <li>
                          {categories &&
                            categories.map((x) => {
                              if (x._id == movie.categoryID) {
                                return (
                                  <span className="category" key={x._id}>
                                    {x.name}
                                  </span>
                                );
                              }
                            })}
                        </li>
                        <li>
                          {languages &&
                            languages.map((x) => {
                              if (x._id == movie.languageID) {
                                return (
                                  <span className="language" key={x._id}>
                                    <i
                                      style={{
                                        color: "#DC1A28",
                                        marginRight: "5px",
                                        fontSize: "15px",
                                      }}
                                      className="fa-solid fa-globe"
                                    ></i>{" "}
                                    {x.name}
                                  </span>
                                );
                              }
                            })}
                        </li>
                        <li>
                          <span className="date">
                            <i
                              style={{
                                color: "#DC1A28",
                                marginRight: "5px",
                                fontSize: "15px",
                              }}
                              className="fa-solid fa-calendar-days"
                            ></i>{" "}
                            {new Date(movie.releaseDate).getFullYear()}
                          </span>
                          <span className="duration">
                            <i
                              style={{
                                color: "#DC1A28",
                                marginRight: "5px",
                                fontSize: "15px",
                              }}
                              className="fa-regular fa-clock"
                            ></i>{" "}
                            {movie.duration} min
                          </span>
                        </li>
                      </ul>
                    </div>
                    <p>{movie.desc}</p>
                    <div className="movie-trailer">
                      <ul>
                        <li className="favoriteBTN">
                          <button
                            className={active ? "active" : ""}
                            onClick={async () => {
                              if (!user) {
                                navigate("/login");
                              } else {
                                setActive("active");
                                let favMovie = user.favorites.find(
                                  (fav) => fav._id == movie._id
                                );
                                if (!favMovie) {
                                  let updatedFavorites = [
                                    ...user.favorites,
                                    movie,
                                  ];

                                  setUser((prevUser) => ({
                                    ...prevUser,
                                    favorites: updatedFavorites,
                                  }));

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
                                } else {
                                  console.log("Already");
                                }
                              }
                            }}
                          >
                            <i className="fa-solid fa-heart"></i>
                          </button>
                        </li>
                        <li className="streaming">
                          <h6>Prime Video</h6>
                          <span>Streaming Channels</span>
                        </li>
                        <li className="trailer">
                          <button
                            onClick={() => {
                              handleOpen();
                              setCurrentTrailer(movie.trailerURL);
                            }}
                          >
                            <i
                              style={{ marginRight: "10px" }}
                              className="fa-solid fa-play play-icon"
                            ></i>{" "}
                            Watch Trailer
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          </section>
          <section id="movie-area">
            <div className="container">
              {user.plan ? (
                new Date(movie.releaseDate) > new Date() ? (
                  <div className="goPricing text-center">
                    <h3>The film has not been released yet.</h3>
                  </div>
                ) : (
                  <video width="100%" height="100%" controls src={movie.movie}>
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="goPricing text-center">
                  <h3>
                    If you buy any package, you can watch it{" "}
                    <Link to="/pricing">Go Pricing</Link>
                  </h3>
                </div>
              )}

              <div className="movie-history">
                <h3>
                  About <span>History</span>
                </h3>
                <p>{movie.history}</p>
              </div>
            </div>
          </section>
          <section id="related-movie">
            <div className="container">
              <div className="section-title">
                <span>Related</span>
                <h2>Related Movies</h2>
              </div>
              <div className="row">
                {movies &&
                  movies.slice(0, 4).map((item) => {
                    if (
                      item.categoryID == movie.categoryID &&
                      item._id != movie._id
                    ) {
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
                                <button
                                  onClick={() => {
                                    setActive(null);
                                  }}
                                  className="cardDetailBTN"
                                >
                                  Detail
                                </button>
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
                    }
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MovieDetail;
