import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import moment from "moment";
import { deleteUser, getAllUsers } from "../../../api/authRequests";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Users = () => {
  const [users, setUsers] = useState([]);
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
    getAllUsers().then((data) => {
      setUsers(data.filter((x) => !x.isAdmin));
      setLoading(false);
    });
  }, [setUsers]);

  const columns = [
    {
      title: "Image",
      render: (value) => {
        if (value.userIMG !== null) {
          return (
            <img
              width={"400px"}
              height={"200px"}
              style={{ objectFit: "contain" }}
              src={value.userIMG}
              alt={value.username}
            />
          );
        } else {
          return (
            <img
              width={"100px"}
              height={"20%"}
              src="https://www.shareicon.net/data/512x512/2015/09/18/642819_administrator_512x512.png"
              alt={value.username}
            />
          );
        }
      },
    },
    {
      title: "Userame",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "User Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      sorter: (a, b) => a.plan.localeCompare(b.plan),
    },
    {
      title: "Verified",
      render: (value) =>
        value.isVerified ? (
          <i
            style={{ fontSize: "25px", color: "green" }}
            className="fa-solid fa-check"
          ></i>
        ) : (
          <i
            style={{ fontSize: "25px", color: "red" }}
            className="fa-solid fa-x"
          ></i>
        ),
      sorter: (a, b) => a.isVerified - b.isVerified,
    },
    {
      title: "Registered Date",
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
                deleteUser(value._id);
                setUsers(users.filter((x) => x._id != value._id));
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
          <title>Users</title>
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
          id="users"
        >
          <div className="container">
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={users}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Users;
