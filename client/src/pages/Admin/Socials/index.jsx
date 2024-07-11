import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteSocial, getSocials } from "../../../api/socialsRequests";
import moment from "moment";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Socials = () => {
  const [socials, setSocials] = useState([]);
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
    getSocials().then((data) => {
      setSocials(data);
      setLoading(false);
    });
  }, [setSocials]);

  const columns = [
    {
      title: "Icon",
      render: (value) => (
        <i style={{ fontSize: "25px" }} className={value.icon}></i>
      ),
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Social Media Link",
      render: (value) => (
        <a style={{ fontSize: "20px" }} target="_blank" href={value.link}>
          Link
        </a>
      ),
    },
    {
      title: "Update Date",
      render: (value) => moment(value.uploadDate).format("LLL"),
      sorter: (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate),
    },
    {
      title: "Edit",
      render: (value) => (
        <Button
          onClick={() => {
            navigate(`/admin/socials/${value._id}`);
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
                deleteSocial(value._id);
                setSocials(socials.filter((x) => x._id != value._id));
                Swal.fire("Deleted!", "Service has been deleted.", "success");
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
          <title>Socials</title>
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
          id="socials"
        >
          <div className="container">
            <Button
              onClick={() => {
                navigate("/admin/socials-add");
              }}
              style={{ margin: "0 0 20px 20px" }}
              variant="contained"
              color="success"
            >
              Add Social Media Link
            </Button>
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={socials}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Socials;
