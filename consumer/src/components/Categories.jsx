import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Categories = () => {
  const { categories } = useSelector((state) => state.home);
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      autoPlay={true}
      infinite={true}
      arrows={true}
      responsive={responsive}
      transitionDuration={500}
      containerClass="carousel-container"
      itemClass="carousel-item-spacing"
    >
      {categories.map((category) => (
        <Link
          className="h-[450px] border block column"
          key={category.id}
          to={`/products?category=${category.name}`}
          onClick={handleLinkClick}
          style={{
            margin: "0 10px",
            borderRadius: "10px",
            overflow: "hidden",
            border: "2px solid #ddd",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "0px",
          }}
        >
          <div className="w-full h-full relative p-3">
            <img
              src={category.image}
              alt={category.name}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
              <span
                style={{
                  padding: "8px 16px",
                  color: "black",
                  fontSize: "16px",
                  borderRadius: "5px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {category.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default Categories;
