import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { getAllBlogCategories, getAllBlogs } from "../../../api/blogRequests";
import moment from "moment";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [searchInp, setSearchInp] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [blogsCopy, setBlogsCopy] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  
  useEffect(() => {
    getAllBlogs().then((data) => {
      setBlogs(  
        data.sort((x, y) => new Date(y.uploadDate) - new Date(x.uploadDate))
      );
      setBlogsCopy(
        data.sort((x, y) => new Date(y.uploadDate) - new Date(x.uploadDate))
      );
      setLoading(false);
    });
  }, [setBlogs]);

  useEffect(() => {
    getAllBlogCategories().then((data) => {
      setCategories(data);
    });
  }, [setCategories]);

  useEffect(() => {
    if (category) {
      setBlogs(blogsCopy.filter((x) => x.categoryID == category));
    } else {
      setBlogs(blogsCopy);
    }
  }, [category]);

  function handleChange(e) {
    setSearchInp(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (searchInp == "") {
      setBlogs(blogsCopy);
    } else {
      getAllBlogs(searchInp).then((data) => {
        setBlogs(data);
      });
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Blog</title>
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
        <>
          <section id="hero">
            <div className="container">
              <div className="breadcrumb-content text-center">
                <h2>News Update</h2>
                <nav>
                  <ul>
                    <li>
                      <Link style={{ color: "#DC1A28" }} to="/">
                        Home
                      </Link>
                    </li>
                    <li>Blog Page</li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section id="blog">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  {blogs &&
                    blogs.map((blog) => {
                      return (
                        <div key={blog._id} className="blog-card">
                          <div className="blog-img">
                            <Link to={`/blog/${blog._id}`}>
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "4px",
                                }}
                                src={blog.imageURL}
                                alt="blog-img"
                              />
                            </Link>
                          </div>
                          <div className="blog-content">
                            <span>
                              <i
                                style={{ marginRight: "5px", color: "#DC1A28" }}
                                className="fa-regular fa-clock"
                              ></i>{" "}
                              {moment(blog.uploadDate).format("ll")}
                            </span>
                            <h2>
                              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                            </h2>
                            <p>{blog.firstDesc}</p>

                            <div className="blog-meta">
                              <ul>
                                <li>
                                  <i
                                    style={{
                                      marginRight: "8px",
                                      color: "#DC1A28",
                                    }}
                                    className="fa-solid fa-hashtag"
                                  ></i>{" "}
                                  <a href="#">
                                    {categories &&
                                      categories.map((x) => {
                                        if (x._id == blog.categoryID) {
                                          return x.name;
                                        }
                                      })}
                                  </a>
                                </li>
                                <li>
                                  <i
                                    style={{
                                      marginRight: "8px",
                                      color: "#DC1A28",
                                    }}
                                    className="fa-regular fa-thumbs-up"
                                  ></i>{" "}
                                  {blog.likeCount}
                                </li>
                                <li>
                                  <i
                                    style={{
                                      marginRight: "8px",
                                      color: "#DC1A28",
                                    }}
                                    className="fa-regular fa-comments"
                                  ></i>{" "}
                                  <Link to={`/blog/${blog._id}`}>
                                    {blog.commentCount} Comments
                                  </Link>
                                </li>
                              </ul>
                              <div className="read-more">
                                <Link to={`/blog/${blog._id}`}>
                                  Read More{" "}
                                  <i
                                    style={{ marginLeft: "5px" }}
                                    className="fa-solid fa-angles-right"
                                  ></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="col-lg-4">
                  <div className="blog-sidebar">
                    <div className="blog-widget">
                      <div className="widget-title">
                        <h5>Search Objects</h5>
                      </div>
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                          onChange={(e) => handleChange(e)}
                          className="search"
                          type="text"
                          placeholder="Search..."
                        />
                        <button>
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </form>
                    </div>
                    <div className="blog-widget">
                      <div className="widget-title">
                        <h5>Categories</h5>
                      </div>
                      <div className="blog-categories">
                        <ul>
                          <li>
                            <span
                              className="category"
                              onClick={() => {
                                setCategory("");
                              }}
                            >
                              All
                            </span>
                            <span style={{ float: "right" }}>
                              {categories.length - 1}
                            </span>
                          </li>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <li key={category._id}>
                                  <span
                                    className="category"
                                    onClick={() => {
                                      setCategory(category._id);
                                    }}
                                  >
                                    {category.name}
                                  </span>{" "}
                                  <span style={{ float: "right" }}>
                                    {
                                      blogsCopy.filter(
                                        (x) => x.categoryID == category._id
                                      ).length
                                    }
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                    <div className="blog-widget">
                      <div className="widget-title">
                        <h5>Recent Posts</h5>
                      </div>
                      <div className="recent-posts">
                        <ul>
                          {blogsCopy.slice(0, 3) &&
                            blogsCopy.slice(0, 3).map((blog) => {
                              return (
                                <li key={blog._id}>
                                  <div className="img">
                                    <Link to={`/blog/${blog._id}`}>
                                      <img src={blog.imageURL} alt="recent" />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h5>
                                      <Link to={`/blog/${blog._id}`}>
                                        {blog.title}
                                      </Link>
                                    </h5>
                                    <span>
                                      <i
                                        style={{
                                          marginRight: "5px",
                                          color: "#DC1A28",
                                        }}
                                        className="fa-regular fa-clock"
                                      ></i>{" "}
                                      {moment(blog.uploadDate).format("ll")}
                                    </span>
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Blog;

     