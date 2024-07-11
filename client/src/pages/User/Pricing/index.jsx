import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAllPrices } from "../../../api/pricingRequests";
import { useQualityContext } from "../../../context/QualitiesContext";
import { editUser } from "../../../api/authRequests";
import { useUserContext } from "../../../context/UserContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Pricing = () => {
  const [user, setUser] = useUserContext();
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([]);
  const [qualities, setQualities] = useQualityContext();
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPrices().then((data) => {
      setPrices(data);
      setLoading(false);
    });
    if (user) {
      setLoading(false);
      setActiveButton(user.plan);
    }
  }, [user]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Pricing</title>
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
                <h2>Our Plan</h2>
                <nav>
                  <ul>
                    <li>
                      <Link style={{ color: "#DC1A28" }} to="/">
                        Home
                      </Link>
                    </li>
                    <li>Pricing</li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section id="pricing">
            <div className="container">
              <div className="section-title text-center">
                <span>our pricing plans</span>
                <h2>Our Pricing Strategy</h2>
              </div>
              <div className="pricing-boxes">
                <div className="row">
                  {prices &&
                    prices.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="col-lg-4 col-md-6 col-sm-8"
                        >
                          <div
                            className={
                              activeButton === item.planName ? "active" : ""
                            }
                            id="pricing-box"
                          >
                            <div className="pricing-top">
                              <h6>{item.planName}</h6>
                              <div className="price">
                                <h3>${item.price}</h3>
                                <span>Monthly</span>
                              </div>
                            </div>
                            <div className="pricing-list">
                              <ul>
                                <li>
                                  <i
                                    style={{
                                      fontWeight: "900",
                                      marginRight: "10px",
                                      fontSize: "15px",
                                    }}
                                    className="fa-solid fa-check"
                                  ></i>{" "}
                                  Video quality
                                  <span>{item.quality}</span>
                                </li>
                                <li>
                                  <i
                                    style={{
                                      fontWeight: "900",
                                      marginRight: "10px",
                                      fontSize: "15px",
                                    }}
                                    className="fa-solid fa-check"
                                  ></i>{" "}
                                  Resolution
                                  <span>
                                    {qualities &&
                                      qualities.map((x) => {
                                        if (x._id == item.qualityID) {
                                          return x.name;
                                        }
                                      })}
                                  </span>
                                </li>
                                <li>
                                  <i
                                    style={{
                                      fontWeight: "900",
                                      marginRight: "10px",
                                      fontSize: "15px",
                                    }}
                                    className="fa-solid fa-check"
                                  ></i>{" "}
                                  Screens you can watch
                                  <span>{item.screenCount}</span>
                                </li>
                                <li>
                                  <i
                                    style={{
                                      fontWeight: "900",
                                      marginRight: "10px",
                                      fontSize: "15px",
                                    }}
                                    className="fa-solid fa-check"
                                  ></i>{" "}
                                  You can Download on supported device
                                  <span>{item.downloadCount}</span>
                                </li>
                              </ul>
                            </div>
                            <div className="pricing-btn">
                              <button
                                onClick={() => {
                                  if (!user) {
                                    navigate("/login");
                                  } else {
                                    setActiveButton(item.planName);
                                    setUser((prevUser) => ({
                                      ...prevUser,
                                      plan: item.planName,
                                    }));
                                    localStorage.setItem(
                                      "user",
                                      JSON.stringify({
                                        ...user,
                                        plan: item.planName,
                                      })
                                    );
                                    editUser(user.id, { plan: item.planName });
                                  }
                                }}
                                className="pricingBTN"
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Pricing;
