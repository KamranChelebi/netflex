import React, { useEffect, useState } from "react";
import "./index.scss";

const ScrollTop = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      let scrolly = window.scrollY;
      if (scrolly > 250) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScrollTop() {
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <button
        onClick={handleScrollTop}
        className={`scroll-topBTN ${open ? "open" : ""}`}
      >
        <i className="fa-solid fa-angle-up"></i>
      </button>
    </>
  );
};

export default ScrollTop;
