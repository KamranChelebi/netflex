import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteService, getAllServices } from "../../../api/servicesRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Services = () => {
  const [services, setServices] = useState([]);
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
    getAllServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, [setServices]);

  const columns = [
    {
      title: "Icon",
      render: (value) => (
        <i style={{ fontSize: "25px" }} className={value.iconClass}></i>
      ),
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Service Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "desc",
      sorter: (a, b) => a.desc.localeCompare(b.desc),
    },
    {
      title: "Edit",
      render: (value) => (
        <Button
          onClick={() => {
            navigate(`/admin/services/${value._id}`);
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
                deleteService(value._id);
                setServices(services.filter((x) => x._id != value._id));
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
          <title>Services</title>
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
          id="services"
        >
          <div className="container">
            <Button
              onClick={() => {
                navigate("/admin/service-add");
              }}
              style={{ margin: "0 0 20px 20px" }}
              variant="contained"
              color="success"
            >
              Add Service
            </Button>
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={services}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Services;
