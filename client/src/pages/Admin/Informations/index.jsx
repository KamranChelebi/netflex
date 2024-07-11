import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { getInformations } from "../../../api/informationRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Informations = () => {
  const [infos, setInfos] = useState([]);
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
    getInformations().then((data) => {
      setInfos(data);
      setLoading(false);
    });
  }, [setInfos]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Informations</title>
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
          id="informations"
        >
          <div className="container">
            {infos &&
              infos.map((x) => {
                return (
                  <Button
                    onClick={() => {
                      navigate(`/admin/informations/${x._id}`);
                    }}
                    style={{ fontSize: "18px" }}
                    variant="contained"
                    color="success"
                    key={x._id}
                  >
                    Edit Informations
                  </Button>
                );
              })}
            <div className="row">
              <div className="col-lg-4 info-list">
                {infos &&
                  infos.map((info) => {
                    return (
                      <ul key={info._id}>
                        <li>
                          <div className="icon">
                            <i className="fa-solid fa-location-dot"></i>
                          </div>{" "}
                          <p>
                            <span>Address: </span> {info.address}
                          </p>
                        </li>
                        <li>
                          <div className="icon">
                            <i className="fa-solid fa-phone"></i>
                          </div>{" "}
                          <p>
                            <span>Phone:</span> (+994) {info.phone}
                          </p>
                        </li>
                        <li>
                          <div className="icon">
                            <i className="fa-solid fa-envelope"></i>
                          </div>{" "}
                          <p>
                            <span>Email:</span> {info.email}
                          </p>
                        </li>
                      </ul>
                    );
                  })}
              </div>
              <div className="col-lg-8">
                {infos &&
                  infos.map((info) => {
                    return (
                      <iframe
                        key={info._id}
                        src={info.iframe}
                        width="100%"
                        height="550"
                        style={{ border: "0" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Informations;
