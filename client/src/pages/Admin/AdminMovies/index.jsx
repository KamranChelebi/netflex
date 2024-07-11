import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteMovie, getAllMovies } from "../../../api/movieRequests";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
    getAllMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, [setMovies]);

  const columns = [
    {
      title: "Poster",
      render: (value) => {
        return (
          <a href={value.moviePoster} target="_blank">
            <img
              width={"70%"}
              height={"70%"}
              src={value.moviePoster}
              alt={value.title}
            />
          </a>
        );
      },
    },
    {
      title: "Movie",
      render: (value) => {
        return (
          <a
            style={{
              fontSize: "16px",
            }}
            target="_blank"
            href={value.movie}
          >
            Movie
          </a>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "IMDB",
      dataIndex: "IMDB",
      sorter: (a, b) => a.IMDB - b.IMDB,
    },
    {
      title: "View Count",
      dataIndex: "viewCount",
      sorter: (a, b) => a.viewCount - b.viewCount,
    },
    {
      title: "Release Date",
      render: (value) => {
        return (
          <span
            className={
              new Date() < new Date(value.releaseDate) ? "release" : ""
            }
          >
            {moment(value.releaseDate).format("L")}
          </span>
        );
      },
      sorter: (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate),
    },
    {
      title: "Trailer",
      render: (value) => {
        return (
          <a
            style={{ fontSize: "16px" }}
            target="_blank"
            href={value.trailerURL}
          >
            Trailer
          </a>
        );
      },
    },

    {
      title: "Edit",
      render: (value) => (
        <Button
          onClick={() => {
            navigate(`/admin/movies/${value._id}`);
          }}
          variant="contained"
          color="info"
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      render: (value) => (
        <Button
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#DC1A28",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteMovie(value._id);
                setMovies(movies.filter((x) => x._id != value._id));
                Swal.fire("Deleted!", "Movie has been deleted.", "success");
              }
            });
          }}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      ),
    },
  ];
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
        <section
          style={{
            minHeight: "90vh",
            padding: "30px 0",
            backgroundImage:
              "url(https://themebeyond.com/html/movflx/img/bg/movie_bg.jpg)",
          }}
          id="admin-movies"
        >
          <div className="container">
            <Button
              onClick={() => {
                navigate("/admin/movie-add");
              }}
              style={{ margin: "0 0 20px 20px" }}
              variant="contained"
              color="success"
            >
              Add Movie
            </Button>
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={movies}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default AdminMovies;
