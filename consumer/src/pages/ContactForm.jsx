import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimerSharp } from "react-icons/io5";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message has been sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <section className=" mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto"></div>
          <div className=" pr-1">
            <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
              <div className="flex justify-start items-center text-md text-slate-600 w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Contact Us</span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </section>
      <div class="mt-20 bg-[url('http://localhost:3000/images/contact.jpg')] max-w-6xl max-lg:max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <div class="grid md-lg:grid-cols-2  xl:grid-cols-2 sm:grid-cols-1 items-center gap-14 sm:p-8 p-4 ">
          <div>
            <h1 class="text-4xl font-bold text-white text-center ">
              CONTACT US
            </h1>
            <p class="text-lg text-white mt-4 leading-relaxed text-center ">
              {" "}
              <i>
                We're here to help! Reach out to us now for any inquiries or
                concerns.
              </i>
            </p>
            <ul class="text-lg text-white">
              <li class="pl-4 flex items-center">
                <FaPhoneAlt className="pr-2 size-7" /> Call Us
              </li>
              <li className="text-sm"> +94 (76) 9364744</li>
              <li className="text-sm"> +94 (71) 8182109</li>
              <li class="pl-4 pt-4 text-lg text-white flex items-center">
                <MdEmail className="pr-2 size-7" />
                Email:
              </li>
              <li className="text-sm">
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

              <li class="pl-4 pt-4 text-lg text-white flex items-center">
                <FaLocationDot className="pr-2 size-7" />
                Location:
              </li>
              <li className="text-sm"> No.481, Salmal Uyana, Mulleriyawa </li>

              <li class="pl-4 pt-4 text-lg text-white flex items-center">
                <IoTimerSharp className="pr-2 size-7" />
                Business Hours:
              </li>
              <li className="text-sm">Mon - Sun ..... 24 Hours </li>
            </ul>
          </div>
          <div class="bg-gray-100 p-6 rounded-lg">
            <p class="text-sm text-gray-800 font-semibold ">
              We'd love to hear from you - please use the form to send us your
              message or ideas.
            </p>
            <div class="space-y-4 max-lg:mt-4">
              <form onSubmit={handleSubmit} class="mt-8 space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  class="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-[#340055]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  class="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-[#340055]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  class="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-[#340055]"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="6"
                  class="w-full rounded-lg px-4 text-gray-800 text-sm pt-3 outline-[#340055]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button
                  type="submit"
                  class="text-white bg-[#3e3656] hover:bg-[#635787] tracking-wide rounded-lg text-lg px-4 py-3 flex items-center justify-center w-full !mt-6"
                >
                  {" "}
                  <strong> Send Message </strong>{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
      <Footer />
    </div>
  </div>
  );
};

export default ContactForm;
