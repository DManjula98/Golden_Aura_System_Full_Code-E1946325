import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
const About = () => {
  return (
    <div>
      <Header />
      <section className=" mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto"></div>
          <div className="  pr-1">
            <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
              <div className="flex justify-start items-center text-md text-slate-600 w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>About</span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </section>
      <div class="mt-20 max-w-6xl max-lg:max-w-3xl mx-auto font-[sans-serif] bg-white rounded-lg shadow-lg">
        <div className=" bg-[url('http://localhost:3000/images/about.jpg')] font-[sans-serif] my-4 p-6 max-w-[1200px] mx-auto rounded-lg">
          <div className="text-center  p-6 ">
            <h2 class="text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
              About
            </h2>
          </div>
          <section className="mt-6 text-gray-600 leading-relaxed bg-white rounded-lg p-6 border-b-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 ">
              Who We Are
            </h2>
            <p className="mt-2 text-gray-500">
              Golden Aura is a cutting-edge online marketplace dedicated to
              delivering the best in health and beauty products. our mission is
              to create a seamless shopping experience that combines
              convenience, quality, and trust.
            </p>
            <p className="mt-1 text-gray-500 pb-10">
              With a wide range of products from trusted sellers and brands, we
              aim to empower customers to feel confident and radiant in their
              daily lives.
            </p>
            <hr />
            <h2 className="mt-10 text-2xl font-bold text-gray-700 mb-4 ">
              Our Mission
            </h2>
            <p className="mt-2 text-gray-500 pb-10">
              To connect customers with high-quality health and beauty products
              while promoting sustainable practices and supporting small and
              medium-sized businesses.
            </p>
            <hr />
            <h2 className="mt-10 text-2xl font-bold text-gray-700 mb-4 ">
              Our Vision
            </h2>
            <p className="mt-2 text-gray-500 pb-10">
              To become a leader in the health and beauty e-commerce space,
              fostering a community where every individual feels valued and
              confident in their journey to wellness and beauty.
            </p>
            <hr />
            <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-10">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-3 pb-10">
              <li>
                <strong>Extensive Product Range:</strong> From skincare and
                cosmetics to wellness supplements and grooming essentials, we
                cater to all your health and beauty needs.
              </li>
            </ul>
            <hr />
            <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-10">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-3 pb-10">
              <li>
                <strong>User-Friendly Platform:</strong> Designed with you in
                mind, our website is simple, secure, and efficient.
              </li>
              <li>
                <strong>Verified Sellers:</strong> We work only with verified
                sellers to ensure authenticity and quality.
              </li>
              <li>
                <strong>Secure Payments:</strong> Our payment system uses the
                stripe payment method to keep your transactions safe.
              </li>
              <li>
                <strong>Customer Support with online chat:</strong> Sellers are
                always ready to help, ensuring you have a hassle-free
                experience.
              </li>
            </ul>
            <hr />
            <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-10">
              Contact Us
            </h2>
            <p className="mt-2 text-gray-500 pb-3">
              Have questions or feedback? We’d love to hear from you! Reach out
              to us at:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-3">
              <li>
                <strong>Email:</strong> <u>
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
              <li>
                <strong>Contact No:</strong>{" "}+94 (76) 9364744 / +94 (71) 8182109
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
