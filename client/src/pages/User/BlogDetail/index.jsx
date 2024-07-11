import React, { useEffect, useState } from "react";
import {
  getAllBlogCategories,
  getAllBlogs,
  getBlogByID,
} from "../../../api/blogRequests";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "./index.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

const BlogDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const [categories, setCategories] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);

  useEffect(() => {
    getBlogByID(id).then((data) => {
      setBlog(data);
      setLoading(false);
    });
  }, [setBlog]);

  useEffect(() => {
    getAllBlogCategories().then((data) => {
      setCategories(data);
    });
  }, [setCategories]);

  useEffect(() => {
    getAllBlogs().then((data) => {
      setSortedBlogs(data.sort((x, y) => y.uploadDate - x.uploadDate));
    });
  }, [sortedBlogs]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Blog Detail</title>
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
                <h2>News Details</h2>
                <nav>
                  <ul>
                    <li>
                      <Link style={{ color: "#DC1A28" }} to="/">
                        Home
                      </Link>
                    </li>
                    <li>Blog Details</li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <div id="blog-detail">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="blog-card">
                    <div className="blog-img">
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "4px",
                        }}
                        src={blog.imageURL}
                        alt="blog-img"
                      />
                    </div>
                    <div className="blog-content">
                      <span>
                        <i
                          style={{ marginRight: "5px", color: "#DC1A28" }}
                          className="fa-regular fa-clock"
                        ></i>{" "}
                        {moment(blog.uploadDate).format("ll")}
                      </span>
                      <h2>{blog.title}</h2>
                      <p>{blog.firstDesc}</p>
                      <p>{blog.secondDesc}</p>
                      <blockquote>
                        <i
                          style={{
                            float: "left",
                            fontSize: "55px",
                            color: "#DC1A28",
                            marginRight: "30px",
                          }}
                          className="fa-solid fa-quote-right"
                        ></i>
                        <p>
                          Watch Netflex movies online or stream rights to your
                          smart TV, game console, PC, mobile more.
                        </p>
                        <figure>
                          <span>Safarov</span> Founder ceo
                        </figure>
                      </blockquote>

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
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="blog-sidebar">
                    <div className="blog-widget">
                      <div className="widget-title">
                        <h5>Recent Posts</h5>
                      </div>
                      <div className="recent-posts">
                        <ul>
                          {sortedBlogs.slice(0, 3) &&
                            sortedBlogs.slice(0, 3).map((item) => {
                              return (
                                <li key={item._id}>
                                  <div className="img">
                                    <Link to={`/blog/${item._id}`}>
                                      <img src={item.imageURL} alt="recent" />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h5>
                                      <Link to={`/blog/${item._id}`}>
                                        {item.title}
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
                                      {moment(item.uploadDate).format("ll")}
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
          </div>
        </>
      )}
    </>
  );
};

export default BlogDetail;
