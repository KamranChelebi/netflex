import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { deleteContact, getAllContacts } from "../../../api/contactRequests";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
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
    getAllContacts().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  }, [setContacts]);

  const columns = [
    {
      title: "Sender's Name",
      dataIndex: "name",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Sender's Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Message Subject",
      dataIndex: "subject",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Message",
      dataIndex: "message",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Date of Sending",
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
                deleteContact(value._id);
                setContacts(contacts.filter((x) => x._id != value._id));
                Swal.fire("Deleted!", "Message has been deleted.", "success");
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
          <title>Messages</title>
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
          id="contacts"
        >
          <div className="container">
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={contacts}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default AdminContacts;
