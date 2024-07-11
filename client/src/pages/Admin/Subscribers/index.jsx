import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import {
  deleteSubscriber,
  getAllSubscribers,
} from "../../../api/subscribersRequests";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
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
    getAllSubscribers().then((data) => {
      setSubscribers(data);
      setLoading(false);
    });
  }, [setSubscribers]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Subscriber Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Subscrib Date",
      render: (value) => moment(value.uploadDate).format("LLL"),
      sorter: (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate),
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
                deleteSubscriber(value._id);
                setSubscribers(subscribers.filter((x) => x._id != value._id));
                Swal.fire(
                  "Deleted!",
                  "Subscriber has been deleted.",
                  "success"
                );
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
          <title>Subscribers</title>
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
          id="subscribers"
        >
          <div className="container">
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={subscribers}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Subscribers;
