import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteBlog,
  getAllBlogCategories,
  getAllBlogs,
} from "../../../api/blogRequests";
import moment from "moment";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();

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
    getAllBlogCategories().then((data) => {
      setCategories(data);
    });
    getAllBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, [setBlogs]);

  const columns = [
    {
      title: "Image",
      render: (value) => {
        return (
          <img
            width={"200px"}
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
      title: "Like Count",
      dataIndex: "likeCount",
      sorter: (a, b) => a.likeCount - b.likeCount,
    },
    {
      title: "Comment Count",
      dataIndex: "commentCount",
      sorter: (a, b) => a.commentCount - b.commentCount,
    },
    {
      title: "Category",
      render: (value) =>
        categories &&
        categories.map((x) => {
          if (x._id == value.categoryID) {
            return (
              <span key={x._id} style={{ fontSize: "16px" }}>
                {x.name}
              </span>
            );
          }
        }),
    },
    {
      title: "Upload Date",
      render: (value) => moment(value.uploadDate).format("LLL"),
      sorter: (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate),
    },
    {
      title: "Edit",
      render: (value) => (
        <Button
          onClick={() => {
            navigate(`/admin/blogs/${value._id}`);
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
                deleteBlog(value._id);
                setBlogs(blogs.filter((x) => x._id != value._id));
                Swal.fire("Deleted!", "Blog has been deleted.", "success");
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
          <title>Blogs</title>
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
          id="blogs"
        >
          <div className="container">
            <Button
              onClick={() => {
                navigate("/admin/blogs-add");
              }}
              style={{ margin: "0 0 20px 20px" }}
              variant="contained"
              color="success"
            >
              Add Blog
            </Button>
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={blogs}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default AdminBlogs;
