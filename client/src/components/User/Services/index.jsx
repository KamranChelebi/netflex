import React, { useEffect, useState } from "react";
import "./index.scss";
import { getAllServices } from "../../../api/servicesRequests";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    getAllServices().then((data) => {
      setServices(data);
    });
  }, []);
  return (
    <section id="services">
      <div className="container">
        <div className="row align-items-center">
          <div style={{ position: "relative" }} className="col-lg-6">
            <img
              src="..\..\..\src\images\2311855.jpg"
              alt="services"
              style={{width:"100%", height:"100%"}}
            />
            <a
              href="..\..\..\src\images\2311855.jpg"
              className="downloadBTN"
              download
            >
              Download{" "}
              <img
                style={{
                  maxWidth: "24px",
                  verticalAlign: "middle",
                  transform: "rotate(-90deg)",
                }}
                src="http://themebeyond.com/html/movflx/fonts/download.svg"
                alt="download"
              />
            </a>
          </div>
          <div className="col-lg-6" style={{ paddingLeft: "40px" }}>
            <span className="section-title">Our Services</span>
            <h2>Download Your Shows Watch Offline.</h2>
            <p>
              Explore a diverse selection of movies from around the world on our
              streaming platform. Immerse yourself in captivating stories across
              various genres. Stream and enjoy international films in high
              quality, anytime, anywhere. Join our community of movie
              enthusiasts and stay up-to-date with the latest releases. Your
              go-to destination for global cinema.
            </p>
            <ul style={{color:"white", padding:"0"}}>
              {services &&
                services.map((service) => {
                  return (
                    <li className="service-line" key={service._id}>
                      <div className="icon">
                        <i className={service.iconClass}></i>
                      </div>
                      <div className="content">
                        <h5>{service.title}</h5>
                        <p style={{margin:"0"}}>{service.desc}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
