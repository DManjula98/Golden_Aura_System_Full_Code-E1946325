import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Brands = () => {
    const navigate = useNavigate();
    const { products } = useSelector((state) => state.home);
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];
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

      const brandImages = {
        "ACQUA DI PARMA": "http://localhost:3000/images/brand/ACQUA-DI-PARMA.png",
        "BEAUTY-OF-JOSEON": "http://localhost:3000/images/brand/BEAUTY-OF-JOSEON.png",
        "CERAVE": "http://localhost:3000/images/brand/Cerave.png",
        "CETAPHIL": "http://localhost:3000/images/brand/Cetaphil.jpg",
        "DOVE": "http://localhost:3000/images/brand/dove.png",
        "DR RASHEL": "http://localhost:3000/images/brand/Dr Rashel.png",
        "ELEMIS": "http://localhost:3000/images/brand/ELEMIS.png",
        "GARNIER": "http://localhost:3000/images/brand/GARNIER.png",
        "ICONIC": "http://localhost:3000/images/brand/ICONIC.png",
        "IT COSMETICS": "http://localhost:3000/images/brand/IT-Cosmetics.png",
        "JO MALONE LONDON": "http://localhost:3000/images/brand/JO-MALONE-LONDON.jpg",
        "JOVEES": "http://localhost:3000/images/brand/JOVEES.png",
        "LABELLO": "http://localhost:3000/images/brand/Labello.jpg",
        "LA FRESH": "http://localhost:3000/images/brand/La-Fresh.png",
        "LAKME": "http://localhost:3000/images/brand/Lakme.png",
        "LIVING PROOF": "http://localhost:3000/images/brand/living-proof.png",
        "LOREAL": "http://localhost:3000/images/brand/LOREAL.png",
        "NARS": "http://localhost:3000/images/brand/NARS.png",
        "OLAY": "http://localhost:3000/images/brand/OLAY.png",
        "PALMERS": "http://localhost:3000/images/brand/Palmers.jpg",  
        "PONDS": "http://localhost:3000/images/brand/PONDS.jpg",
        "SILCARE": "http://localhost:3000/images/brand/Silcare.png",
        "SISLEY": "http://localhost:3000/images/brand/SISLEY.png",
        "ST.IVES": "http://localhost:3000/images/brand/St.Ives.jpg",
        "THE INKEY LIST": "http://localhost:3000/images/brand/THE INKEY LIST.png",
        "THE ORDINARY": "http://localhost:3000/images/brand/The-Ordinary.png",
        "VIRTUE": "http://localhost:3000/images/brand/VIRTUE.png",
        "WILD FERNS": "http://localhost:3000/images/brand/WILD FERNS.png",
    
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
          {uniqueBrands.map((brand, i) => (
            <Link
              className="h-[200px] border block column"
              key={products.brand}
              to={`/products/brand?brand=${brand}`}
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
                 src={brandImages[brand] || "http://localhost:3000/images/logo.png"}
                  alt={brand}
                  style={{
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
                    {brand}
                  </span>
                 
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      
  )
}

export default Brands