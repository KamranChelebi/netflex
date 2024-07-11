import React, { useEffect, useState } from "react";
import Slider from "../../../components/User/Slider";
import Upcoming from "../../../components/User/Upcoming";
import Services from "../../../components/User/Services";
import TopRated from "../../../components/User/TopRated";
import MovieOfTheDay from "../../../components/User/MovieOfTheDay";
import TopWatched from "../../../components/User/TopWatched";
import { getAllSliders } from "../../../api/sliderRequests";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSliders().then((data) => {
      setSliders(data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Netflex</title>
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
          <Slider />
          <Upcoming />
          <Services />
          <TopRated />
          <MovieOfTheDay />
          <TopWatched />
        </>
      )}
    </>
  );
};

export default Home;
