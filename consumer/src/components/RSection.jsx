import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const RSection = ({ productId }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.home);
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const renderStars = (rating) => {
    return Array(rating)
      .fill()
      .map((_, i) => (
        <span key={i}>&#9733;</span> 
      ));
  };

  return (
    <div className="w-full mt-6 bg-[#e7e5eb]">
      <div className="w-[90%] mx-auto flex flex-col">
        <div className="w-full  p-3 bg-[#564b7a] text-white rounded-lg flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">All Categories</h2>
        </div>
        <div className="w-full">
          <div className="my-8">
            <Carousel
              autoPlay={false}
              infinite={true}
              arrows={true}
              showDots={false}
              responsive={responsive}
              itemClass="px-2"
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.name}`}
                  onClick={handleLinkClick}
                >
                  <div
                    className="bg-white p-4 shadow-md rounded-lg relative w-[350px] h-[250px] flex flex-col items-center justify-center border border-gray-200"
                    style={{ borderRadius: "10px", margin: "0 5px" }}
                  >
                    <h3 className="text-lg font-bold mb-2 text-[#0c3d4c]">
                      {category.name}
                    </h3>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: "50%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSection;
