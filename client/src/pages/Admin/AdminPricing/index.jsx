import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletePrice, getAllPrices } from "../../../api/pricingRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AdminPricing = () => {
  const [prices, setPrices] = useState([]);
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
    getAllPrices().then((data) => {
      setPrices(data);
      setLoading(false);
    });
  }, [setPrices]);

  const columns = [
    {
      title: "Plan Name",
      dataIndex: "planName",
      sorter: (a, b) => a.planName.localeCompare(b.planName),
    },
    {
      title: "Quality",
      dataIndex: "quality",
      sorter: (a, b) => a.quality.localeCompare(b.quality),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Screen",
      dataIndex: "screenCount",
      sorter: (a, b) => a.screenCount - b.screenCount,
    },
    {
      title: "Download",
      dataIndex: "downloadCount",
      sorter: (a, b) => a.downloadCount - b.downloadCount,
    },
    {
      title: "Edit",
      render: (value) => (
        <Button
          onClick={() => {
            navigate(`/admin/pricing/${value._id}`);
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
                deletePrice(value._id);
                setPrices(prices.filter((x) => x._id != value._id));
                Swal.fire("Deleted!", "Prices has been deleted.", "success");
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
        <section
          style={{
            minHeight: "93vh",
            padding: "30px 0",
            backgroundImage:
              "url(https://themebeyond.com/html/movflx/img/bg/movie_bg.jpg)",
          }}
          id="pricing"
        >
          <div className="container">
            <Button
              onClick={() => {
                navigate("/admin/price-add");
              }}
              style={{ margin: "0 0 20px 20px" }}
              variant="contained"
              color="success"
            >
              Add Price
            </Button>
            <Table
              rowKey={"_id"}
              columns={columns}
              dataSource={prices}
              pagination={{ defaultPageSize: 10 }}
            />
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default AdminPricing;
