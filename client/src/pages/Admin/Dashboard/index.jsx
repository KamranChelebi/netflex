import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api/authRequests";
import { getAllMovies } from "../../../api/movieRequests";
import { getAllSubscribers } from "../../../api/subscribersRequests";
import { getAllPrices } from "../../../api/pricingRequests";
import { getAllBlogs } from "../../../api/blogRequests";
import moment from "moment";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { useCategoryContext } from "../../../context/CategoriesContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

const colors = [
  "#483F90",
  "#036957",
  "#b9830e",
  "#DC1A28",
  "rgb(88, 202, 234)",
];

const RADIAN = Math.PI / 180;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [prices, setPrices] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [categories, setCategories] = useCategoryContext();
  let earn = 0;
  let watching = 0;

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
      // setLoading(false);
    });
  }, [setUsers]);

  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data);
      const filtered = data.filter((x) => new Date(x.releaseDate) < new Date());
      setSortedMovies([...filtered.sort((x, y) => y.viewCount - x.viewCount)]);
      const newChartData = [
        ...filtered.sort((x, y) => y.viewCount - x.viewCount),
      ]
        .slice(0, 5)
        .map((movie) => ({
          name: movie.title,
          viewCount: movie.viewCount,
        }));
      setChartData(newChartData);
      setLoading(false);
    });
  }, [setMovies, setChartData]);

  useEffect(() => {
    getAllSubscribers().then((data) => {
      setSubscribers(data);
      // setLoading(false);
    });
  }, [setSubscribers]);

  useEffect(() => {
    getAllPrices().then((data) => {
      setPrices(data);
      // setLoading(false);
    });
  }, [setPrices]);

  useEffect(() => {
    getAllBlogs().then((data) => {
      setBlogs(
        data.sort((x, y) => new Date(y.uploadDate) - new Date(x.uploadDate))
      );
      // setLoading(false);
    });
  }, [setBlogs]);

  //percent
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Dashboard</title>
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
          <section id="dashboard">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between mb-3 pb-1">
                <p
                  style={{
                    color: "#878a99",
                    fontSize: "18px",
                    marginBottom: "0",
                  }}
                >
                  Here's what's happening with your website.
                </p>
                <Link to="/admin/movie-add">
                  <button className="add-btn">
                    <i className="fa-solid fa-circle-plus"></i> Add Movie
                  </button>
                </Link>
              </div>
              <div className="row">
                <div className="col">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <p className="text-uppercase mb-0">Users</p>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="mb-4">{users.length}</h4>
                          <Link to="/admin/users">View users</Link>
                        </div>
                        <div className="icon">
                          <i
                            style={{
                              fontWeight: "400",
                              fontSize: "26.5px",
                              lineHeight: "1",
                            }}
                            className="fa-regular fa-circle-user"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card card-animate"
                    style={{ borderColor: "rgb(88, 202, 234)" }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <p className="text-uppercase mb-0">Movies</p>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="mb-4">{movies.length}</h4>
                          <Link to="/admin/movies">View movies</Link>
                        </div>
                        <div
                          className="icon"
                          style={{
                            color: "rgb(88, 202, 234)",
                            backgroundColor: "rgba(88,202,234,.18)",
                          }}
                        >
                          <i
                            style={{
                              fontWeight: "400",
                              fontSize: "24.5px",
                              lineHeight: "1",
                            }}
                            className="fa-solid fa-film"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card card-animate"
                    style={{ borderColor: "rgb(247, 184, 75)" }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <p className="text-uppercase mb-0">Subscriber</p>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="mb-4">{subscribers.length}</h4>
                          <Link to="/admin/subscribers">View subscribers</Link>
                        </div>
                        <div
                          className="icon"
                          style={{
                            color: "rgb(247, 184, 75)",
                            backgroundColor: "rgba(247,184,75,.18)",
                          }}
                        >
                          <i
                            style={{
                              fontWeight: "400",
                              fontSize: "22.5px",
                              lineHeight: "1",
                            }}
                            className="fa-solid fa-user-plus"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card card-animate"
                    style={{ borderColor: "#DC1A28" }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <p className="text-uppercase mb-0">Total Earning</p>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="mb-4">
                            {users &&
                              users.map((user) => {
                                prices &&
                                  prices.map((x) => {
                                    if (user.plan === x.planName) {
                                      earn += x.price;
                                    }
                                  });
                              })}
                            {earn} $
                          </h4>
                          <Link to="/admin/subscribers">View prices</Link>
                        </div>
                        <div
                          className="icon"
                          style={{
                            color: "#DC1A28",
                            backgroundColor: "rgba(220,26,40,.18)",
                          }}
                        >
                          <i
                            style={{
                              fontWeight: "400",
                              fontSize: "22.5px",
                              lineHeight: "1",
                            }}
                            className="fa-solid fa-wallet"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card card-animate"
                    style={{ borderColor: "rgb(218, 86, 218)" }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <p className="text-uppercase mb-0">Total watching</p>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="mb-4">
                            {movies &&
                              movies.map((movie) => {
                                watching += movie.viewCount;
                              })}
                            {watching} <i className="fa-solid fa-eye"></i>
                          </h4>
                          <Link to="/admin/movies">View movies</Link>
                        </div>
                        <div
                          className="icon"
                          style={{
                            color: "rgb(218, 86, 218)",
                            backgroundColor: "rgba(218, 86, 218,.18)",
                          }}
                        >
                          <i
                            style={{
                              fontWeight: "400",
                              fontSize: "22.5px",
                              lineHeight: "1",
                            }}
                            className="fa-regular fa-eye"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginLeft: "5px" }}>
                <div className="col-lg-9">
                  <div className="row">
                    <div
                      className="col-lg-6"
                      style={{
                        backgroundColor: "#212529",
                        borderRadius: "9px",
                        boxShadow: "0px 1px 7px 0px rgba(0, 0, 0, 0.46)",
                        marginBottom: "30px",
                      }}
                    >
                      <p
                        style={{
                          color: "#878a99",
                          fontSize: "18px",
                          margin: "20px 0 10px",
                        }}
                      >
                        The current percentage of the 5 most watched movies:
                      </p>
                      <ResponsiveContainer width="100%" height={500}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            isAnimationActive={true}
                            label={renderCustomizedLabel}
                            outerRadius={200}
                            fill="#8884d8"
                            dataKey="viewCount"
                            dataLabel="name"
                          >
                            {chartData.map((entry, index) => (
                              <>
                                <Cell
                                  key={`cell-${index}`}
                                  fill={colors[index % colors.length]}
                                />
                              </>
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="colors">
                        <ul>
                          {chartData &&
                            chartData.map((x, idx) => {
                              return (
                                <li
                                  key={idx}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "white",
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: colors[idx],
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                      margin: "0 10px 10px",
                                    }}
                                  ></div>
                                  {x.name}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="top-watched">
                        <div className="widget-title">
                          <h5>Top Watched</h5>
                        </div>
                        <ul>
                          {sortedMovies &&
                            sortedMovies.slice(0, 5).map((movie) => {
                              return (
                                <li key={movie._id}>
                                  <div className="img">
                                    <img src={movie.moviePoster} alt="recent" />
                                  </div>
                                  <div className="content">
                                    <h5>{movie.title}</h5>
                                    <h5>
                                      {movie.IMDB}{" "}
                                      <i
                                        style={{ color: "yellow" }}
                                        className="fa-solid fa-star"
                                      ></i>
                                    </h5>
                                    <p style={{ color: "white" }}>
                                      {movie.duration} min.
                                    </p>
                                    <p style={{ color: "white" }}>
                                      {movie.viewCount}{" "}
                                      <i className="fa-solid fa-eye"></i>
                                    </p>
                                    <span>
                                      <i
                                        style={{
                                          marginRight: "5px",
                                          color: "#DC1A28",
                                        }}
                                        className="fa-regular fa-clock"
                                      ></i>{" "}
                                      {moment(movie.releaseDate).format("ll")}
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
                <div className="col-lg-3">
                  <div className="blog-widget">
                    <div className="widget-title">
                      <h5>Recent Blogs</h5>
                    </div>
                    <div className="recent-blogs">
                      <ul>
                        {blogs &&
                          blogs.slice(0, 3).map((blog) => {
                            return (
                              <li key={blog._id}>
                                <div className="img">
                                  <img src={blog.imageURL} alt="recent" />
                                </div>
                                <div className="content">
                                  <h5>{blog.title}</h5>
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
                  <div className="category-widget">
                    <div className="widget-title">
                      <Link to="/admin/movies-category">
                        <h5>Movie Categories</h5>
                      </Link>
                    </div>
                    <div className="categories">
                      <ul>
                        {categories &&
                          categories.map((category) => {
                            return (
                              <li key={category._id}>
                                <h5>{category.name}</h5>
                                <span>
                                  (
                                  {
                                    movies.filter(
                                      (x) => x.categoryID == category._id
                                    ).length
                                  }
                                  )
                                </span>
                              </li>
                            );
                          })}
                      </ul>
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

export default Dashboard;
