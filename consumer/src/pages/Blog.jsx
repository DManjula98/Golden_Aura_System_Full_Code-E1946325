import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { get_blogs } from "../store/reducers/homeReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_blogs());
  }, []);

  return (
    <div>
      <Header />
      <section className=" mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto"></div>
          <div className=" py-1 mb-1 pr-1">
            <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
              <div className="flex justify-start items-center text-md text-slate-600 w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Blog</span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </section>

      <div class="bg-white font-[sans-serif] my-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center pt-11">
            <h2 class="text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
              Blog
            </h2>
          </div>
          <div class=" grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md-lg:grid-cols-3 gap-4 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
            {blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <Link
                  className="flex justify-start items-start"
                  to={`/blog/details/${blog.title}`}
                >
                  <div
                    key={i}
                    class="bg-white cursor-pointer shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded overflow-hidden relative top-0 hover:-top-2 transition-all duration-300"
                  >
                    <img
                      src={blog.images[0]}
                      alt="Blog Post 2"
                      class="w-full h-60 object-cover"
                    />
                    <div class="p-6 h-[490px]">
                      <span class="text-sm block text-gray-400 mb-2">
                        {new Date(blog.createdAt).toLocaleDateString()} | BY{" "}
                        {blog.name}
                      </span>
                      <h3 class="text-xl font-bold text-gray-800">
                        {blog.title}
                      </h3>
                      <hr class="my-4" />
                      <p class="text-gray-400 text-sm">{blog.description}</p>
                      <p>READE MORE...</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center col-span-4 text-gray-500">
                No blog posts available.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
