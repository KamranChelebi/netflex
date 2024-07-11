import React from "react";
import "./index.scss";
import { useFormik } from "formik";
import {
  getAllSubscribers,
  postSubscriber,
} from "../../../api/subscribersRequests";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subscribers = () => {
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: EmailSchema,
    onSubmit: handleSubmit,
  });
  async function handleSubmit(values, actions) {
    actions.resetForm();
    await getAllSubscribers(values.email).then((data) => {
      if (data) {
        toast.info("You are already subscribed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        postSubscriber(values);
        toast.success("You successfully subscribed!", {
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
  return (
    <>
      <section id="subscribers">
        <div className="container">
          <div className="padding">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h4>Trial Start First 30 Days.</h4>
                <p>Enter your email to create or restart your membership.</p>
              </div>
              <div className="col-lg-6">
                <form onSubmit={formik.handleSubmit}>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                  />
                  <button type="submit" className="btn">
                    get started
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Subscribers;
