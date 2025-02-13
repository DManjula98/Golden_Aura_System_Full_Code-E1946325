import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { useSelector } from "react-redux";
import { AiFillShopping, AiFillHeart } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimerSharp } from "react-icons/io5";

const Footer = () => {
  const { categories } = useSelector((state) => state.home);
  const { cart_products_count, wish_count } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const { userInformation } = useSelector((state) => state.auth);
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-[#e1dfeb]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[190px] h-[70x]"
              src="http://localhost:3000/images/logo.png"
              alt="logo"
            />
            <ul className="flex flex-col gap-2 text-slate-600">
              <li class="pl-4 pt-4 flex items-center">
                <FaLocationDot className="pr-2 size-7" />
                Location:
              </li>
              <li className="text-sm pl-16">
                {" "}
                No.481, Salmal Uyana, Mulleriyawa{" "}
              </li>

              <li class="pl-4 flex items-center">
                <FaPhoneAlt className="pr-2 size-7" /> Call Us :
              </li>
              <li className="text-sm pl-16"> +94 (76) 9364744</li>
              <li className="text-sm pl-16"> +94 (71) 8182109</li>
              <li class="pl-4 pt-4 flex items-center">
                <MdEmail className="pr-2 size-7" />
                Email:
              </li>
              <li className="text-sm pl-16">
                <u>
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    dilrukshimanjula14@gmail.com{" "}
                  </a>
                </u>
              </li>
              <li class="pl-4 pt-4 flex items-center">
                <IoTimerSharp className="pr-2 size-7" />
                Business Hours:
              </li>
              <li className="text-sm pl-16">Mon - Sun ..... 24 Hours </li>
            </ul>
          </div>
        </div>
        <div className="w-3/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-5">Useful Links</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-5 text-slate-600 text-sm">
                  <li>
                    <Link to="/" onClick={handleLinkClick}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={handleLinkClick}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/shops" onClick={handleLinkClick}>
                      About our Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={handleLinkClick}>
                      Contact Information
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" onClick={handleLinkClick}>
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={handleLinkClick}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={handleLinkClick}>
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/12 lg:w-8/12 sm:w-full sm:mt-5">
          <div className="w-full flex flex-col justify-start gap-5">
            <div>
              <h2 className="font-bold text-lg mb-5 ">Category Links</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="list-none flex flex-col gap-5 text-slate-600 text-sm">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/products?category=${category.name}`}
                        onClick={handleLinkClick}
                      >
                        <span>{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg">About Us</h2>
            <span className="text-slate-600">
              We are a leading eCommerce platform providing the best products
              and services for our customers. Your satisfaction is our priority.
            </span>
            <span>
              <div className="h-[50px] w-full  border relative text-slate-600">
                If you have any problem. Contact Us....
                <Link to="/contact" onClick={handleLinkClick}>
                  <button className="h-full absolute right-0 bg-indigo-500 text-white uppercase px-4 font-bold text-sm md:align-bottom">
                    Contact Us...
                  </button>
                </Link>
              </div>
            </span>

            <ul className="flex justify-start items-center gap-3 pt-5">
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="https://www.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>Golden Aura.lk © 2024. All Rights Reserved </span>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] bottom-3 h-[110px] right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          <div
            onClick={() => navigate(userInformation ? "/cart" : "/login")}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-orange-500">
              <AiFillShopping />
            </span>
            {cart_products_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {cart_products_count}
              </div>
            )}
          </div>
          <div
            onClick={() =>
              navigate(userInformation ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-red-500">
              <AiFillHeart />
            </span>
            {wish_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wish_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
