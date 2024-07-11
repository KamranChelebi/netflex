import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteQuality, getQualities } from "../../../api/requests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MoviesQuality = () => {
  const [qualities, setQualities] = useState([]);
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
    getQualities().then((data) => {
      setQualities(data);
      setLoading(false);
    });
  }, [setQualities]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Edit",
      render: (value) => (
        <Button
          onClick={() => {
            navigate(`/admin/movies-quality/${value._id}`);
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
                deleteQuality(value._id);
                setQualities(qualities.filter((x) => x._id != value._id));
                Swal.fire("Deleted!", "Quality has been deleted.", "success");
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
          <title>Movie Qualities</title>
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
            minHeight: "93vh",
            padding: "30px 0",
            backgroundImage:
              "url(https://themebeyond.com/html/movflx/img/bg/movie_bg.jpg)",
          }}
          id="qualities"
        >
          <div className="container">
            <Button
              onClick={() => {
                navigate("/admin/movies-quality-add");
              }}
              style={{ margin: "0 0 20px 20px" }}
              variant="contained"
              color="success"
            >
              Add Movie Quality
            </Button>
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={qualities}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default MoviesQuality;
