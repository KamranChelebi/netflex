import React, { useEffect, useState } from "react";
import "./index.scss";
import { getAllSliders } from "../../../api/sliderRequests";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  height: "80%",
  margin:"auto auto",
  transform: "translate(-50%, -50%)",
};

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    getAllSliders().then((data) => {
      setSliders(data);
    });
  }, [setSliders]);
  return (
    <>
      <section id="slider">
        <Swiper
          spaceBetween={10}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper2"
        >
          {sliders &&
            sliders.map((slider) => {
              return (
                <SwiperSlide
                  key={slider._id}
                  style={{
                    backgroundImage: `url(${slider.imageURL})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-6 col-lg-8">
                        <div
                          data-aos="fade-up"
                          data-aos-easing="ease-in"
                          className="slider-text"
                        >
                          <h6>Netflex</h6>
                          <h1>{slider.title}</h1>
                          <button
                            className="sliderBTN"
                            onClick={() => {
                              handleOpen();
                              setCurrentTrailer(slider.trailerURL);
                            }}
                          >
                            <i className="fa-solid fa-play play-icon"></i> Watch
                            Trailer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box open={open} onClose={handleClose} sx={style}>
              <iframe
                width="100%"
                height="100%"
                src={currentTrailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
          </Modal>
        </Swiper>
      </section>
    </>
  );
};

export default Slider;
