import React, { useEffect, useState } from "react";
import "./index.scss";
import { useMovieContext } from "../../../context/MovieContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCategoryContext } from "../../../context/CategoriesContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { getAllMovies } from "../../../api/movieRequests";
import { getQualities } from "../../../api/requests";

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

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [categories, setCategories] = useCategoryContext();
  const [category, setCategory] = useState("");
  const [qualities, setQualities] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data)
      setMoviesCopy(data);
    });
  }, [setMovies]);

  useEffect(() => {
    if (category) {
      setMovies(moviesCopy.filter((x) => x.categoryID == category));
    } else {
      setMovies(moviesCopy);
    }
  }, [category]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getQualities().then((data) => {
      setQualities(data);
    });
  }, [setQualities]);

  return (
    <section id="upcoming">
      <div className="bgfilter"></div>
      <div className="container">
        <div style={{ marginBottom: "55px" }} className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <span>online streaming</span>
              <h2>Upcoming Movies</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="category">
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={category}
                  style={{ textAlign: "left", color: "white" }}
                  label="Category"
                  onChange={handleChange}
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
          </div>
        </div>
        <div className="movies">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              574: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              574: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {movies &&
              movies.map((movie) => {
                if (
                  new Date().getTime() < new Date(movie.releaseDate).getTime()
                ) {
                  return (
                    <SwiperSlide key={movie._id}>
                      <Card
                        className="movie-card"
                        sx={{
                          width: "100%",
                          height: "100%",
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
                            className="cardBTN"
                          >
                            <i className="fa-solid fa-play play-icon"></i> Watch
                            Trailer
                          </button>
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
                    </SwiperSlide>
                  );
                }
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
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
