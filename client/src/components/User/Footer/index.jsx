import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAllMovies } from "../../../api/movieRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInformationContext } from "../../../context/InformationContext";
import { getSocials } from "../../../api/socialsRequests";

const UserFooter = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [socials, setSocials] = useState([]);
  const [information, setInformation] = useInformationContext();

  useEffect(() => {
    getSocials().then((data) => {
      setSocials(data);
    });
  }, [setSocials]);

  function handleSubmit(e) {
    e.preventDefault();
    getAllMovies(value).then((data) => {
      if (data.length > 0) {
        navigate(`/movies?name=${value}`);
        setValue("");
      } else {
        toast.info("Sorry, this movie was not found!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  }

  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="footer-menu-wrap">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="footer-logo">
                    <a href="/">
                      {information &&
                        information.map((x) => {
                          return (
                            <img
                              key={x._id}
                              src={x.logoIMG}
                              alt="logo"
                              style={{ width: "100%", height: "100%" }}
                            />
                          );
                        })}
                    </a>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="footer-menu">
                    <nav>
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/movies">Movies</Link>
                        </li>
                        <li>
                          <Link to="/pricing">Pricing</Link>
                        </li>
                        <li>
                          <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link to="/contacts">Contacts</Link>
                        </li>
                      </ul>
                      <div className="footer-search">
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <input
                            required
                            type="text"
                            placeholder="Find Favorite Movie"
                            onChange={(e) => handleChange(e)}
                          />
                          <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>
                        </form>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-link">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <ul>
                    <li>
                      <a href="#">Faq</a>
                    </li>
                    <li>
                      <a href="#">Help Center</a>
                    </li>
                    <li>
                      <a href="#">Terms of Use</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-5">
                  <div className="footer-social">
                    <ul>
                      {socials &&
                        socials.map((social) => {
                          return (
                            <li key={social._id}>
                              <a target="_blank" href={social.link}>
                                <i className={social.icon}></i>
                              </a>
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
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <p>
                  Copyright © 2021. All Rights Reserved By{" "}
                  <a href="https://themebeyond.com/html/movflx/index.html">
                    Movflx
                  </a>
                </p>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="payment-method text-center text-md-end">
                  <img
                    style={{ maxWidth: "100%" }}
                    src="https://themebeyond.com/html/movflx/img/images/card_img.png"
                    alt="payment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
};

export default UserFooter;
