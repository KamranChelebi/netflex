import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInformations } from "../../../api/informationRequests";
import "./index.scss";
import { useFormik } from "formik";
import { contactPostSchema } from "../../../validation/ContactPostValidation";
import { postContact } from "../../../api/contactRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactPostSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values, actions) {
    actions.resetForm();
    postContact(values);
    toast.success("Your message sent successfully!", {
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

  useEffect(() => {
    getInformations().then((data) => {
      setInformation(data);
      setLoading(false);
    });
  }, [setInformation]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contact Us</title>
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
                <h2>Contact Us</h2>
                <nav>
                  <ul>
                    <li>
                      <Link style={{ color: "#DC1A28" }} to="/">
                        Home
                      </Link>
                    </li>
                    <li>Contact</li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section id="contact-us">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div id="contact">
                    <div className="title">
                      <h5>Contact Form</h5>
                    </div>
                    <div className="contact-form">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ marginBottom: "30px" }}>
                              <input
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="name"
                                type="text"
                                placeholder="Your Name *"
                              />
                              {formik.errors.name && formik.touched.name && (
                                <span style={{ color: "#DC1A28" }}>
                                  {formik.errors.name}*
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div style={{ marginBottom: "30px" }}>
                              <input
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="email"
                                type="text"
                                placeholder="Your  Email *"
                              />
                              {formik.errors.email && formik.touched.email && (
                                <span style={{ color: "#DC1A28" }}>
                                  {formik.errors.email}*
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div style={{ marginBottom: "30px" }}>
                          <input
                            value={formik.values.subject}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="subject"
                            type="text"
                            placeholder="Subject *"
                          />
                          {formik.errors.subject && formik.touched.subject && (
                            <span style={{ color: "#DC1A28" }}>
                              {formik.errors.subject}*
                            </span>
                          )}
                        </div>
                        <div style={{ marginBottom: "30px" }}>
                          <textarea
                            value={formik.values.message}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="message"
                            placeholder="Type Your Message..."
                          ></textarea>
                          {formik.errors.message && formik.touched.message && (
                            <span style={{ color: "#DC1A28" }}>
                              {formik.errors.message}*
                            </span>
                          )}
                        </div>
                        <button className="contactBTN">Send Message</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-5">
                  <div id="information">
                    <div className="title">
                      <h5>Information</h5>
                    </div>
                    <div className="info">
                      <p>
                        <span>Find solutions :</span> to common problems, or get
                        help from a support agent industry's standard .
                      </p>
                      <div className="info-list">
                        {information &&
                          information.map((info) => {
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section style={{ height: "550px" }} id="location">
            {information &&
              information.map((info) => {
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
          </section>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Contacts;
