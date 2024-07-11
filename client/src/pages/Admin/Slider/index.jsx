import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { deleteSlider, getAllSliders } from "../../../api/sliderRequests";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
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
    getAllSliders().then((data) => {
      setSliders(data);
      setLoading(false);
    });
  }, [setSliders]);

  const columns = [
    {
      title: "Image",
      render: (value) => {
        return (
          <img
            width={"400px"}
            height={"100%"}
            src={value.imageURL}
            alt={value.title}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
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
            navigate(`/admin/slider/${value._id}`);
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
                deleteSlider(value._id);
                setSliders(sliders.filter((x) => x._id != value._id));
                Swal.fire("Deleted!", "Slider has been deleted.", "success");
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
          <title>Sliders</title>
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
          id="sliders"
        >
          <div className="container">
            <Button
              onClick={() => {
                navigate("/admin/slider-add");
              }}
              style={{ margin: "0 0 20px 20px" }}
              variant="contained"
              color="success"
            >
              Add Slider
            </Button>
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={sliders}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Slider;
