import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { get_blog } from "../store/reducers/homeReducer";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.home);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (title) {
      dispatch(get_blog(title));
      window.scrollTo(0, 0);
    }
  }, [title]);

  return (
    <div>
      <Header />
      <section></section>
      <div className="py-8 w-full h-auto my-4">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="flex justify-start  text-md text-slate-600 w-full">
            <Link to="/">Home</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <Link to="/blog">Blog</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <span>{blog.title}</span>
          </div>
          <hr />
        </div>

        <div className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-md  overflow-hidden">
          <img
            className="mt-6 w-full md:w-1/2 h-64 object-cover"
            src={image ? image : blog.images?.[0]}
            alt="image"
          />
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {blog.title}
            </h1>

            <div className="text-gray-700 leading-relaxed mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
              {(blog.description || "").split("\n").map((line, index) => {
                if (line.trim().startsWith("*")) {
                  return (
                    <li key={index} className="list-disc ml-6">
                      {line.replace("*", "").trim()}
                    </li>
                  );
                }
                return (
                  <p key={index} className="mb-2">
                    {line.trim()}
                  </p>
                );
              })}
            </div>
            {blog.first_topic && (
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 pt-8 text-center">
                {blog.first_topic}
              </h2>
            )}
            {(image || blog.images?.[1]) && (
              <img
                className=" w-[450px] md:w-1/2  object-cover mx-auto "
                src={image ? image : blog.images?.[1]}
                alt="image"
              />
            )}
            {blog.first_description && (
              <div className="text-gray-700 leading-relaxed mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {(blog.first_description || "")
                  .split("\n")
                  .map((line, index) => {
                    if (line.trim().startsWith("*")) {
                      return (
                        <li key={index} className="list-disc ml-6">
                          {line.replace("*", "").trim()}
                        </li>
                      );
                    }
                    return (
                      <p key={index} className="mb-2">
                        {line.trim()}
                      </p>
                    );
                  })}
              </div>
            )}

            {blog.second_topic && (
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 pt-8 text-center">
                {blog.second_topic}
              </h2>
            )}
            {(image || blog.images?.[2]) && (
              <img
                className=" w-[450px] md:w-1/2  object-cover mx-auto"
                src={image ? image : blog.images?.[2]}
                alt="image"
              />
            )}
            {blog.second_description && (
              <div className="text-gray-700 leading-relaxed mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {(blog.second_description || "")
                  .split("\n")
                  .map((line, index) => {
                    if (line.trim().startsWith("*")) {
                      return (
                        <li key={index} className="list-disc ml-6">
                          {line.replace("*", "").trim()}
                        </li>
                      );
                    }
                    return (
                      <p key={index} className="mb-2">
                        {line.trim()}
                      </p>
                    );
                  })}
              </div>
            )}

            {blog.third_topic && (
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 pt-8 text-center">
                {blog.third_topic}
              </h2>
            )}
            {(image || blog.images?.[3]) && (
              <img
                className=" w-[450px] md:w-1/2  object-cover mx-auto"
                src={image ? image : blog.images?.[3]}
                alt="image"
              />
            )}
            {blog.third_description && (
              <div className="text-gray-700 leading-relaxed mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {(blog.third_description || "")
                  .split("\n")
                  .map((line, index) => {
                    if (line.trim().startsWith("*")) {
                      return (
                        <li key={index} className="list-disc ml-6">
                          {line.replace("*", "").trim()}
                        </li>
                      );
                    }
                    return (
                      <p key={index} className="mb-2">
                        {line.trim()}
                      </p>
                    );
                  })}
              </div>
            )}
            {blog.forth_topic && (
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 pt-8 text-center">
                {blog.forth_topic}
              </h2>
            )}
            {(image || blog.images?.[4]) && (
              <img
                className=" w-[450px] md:w-1/2  object-cover mx-auto"
                src={image ? image : blog.images?.[4]}
                alt="image"
              />
            )}

            {blog.forth_description && (
              <div className="text-gray-700 leading-relaxed mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {(blog.forth_description || "")
                  .split("\n")
                  .map((line, index) => {
                    if (line.trim().startsWith("*")) {
                      return (
                        <li key={index} className="list-disc ml-6">
                          {line.replace("*", "").trim()}
                        </li>
                      );
                    }
                    return (
                      <p key={index} className="mb-2">
                        {line.trim()}
                      </p>
                    );
                  })}
              </div>
            )}

            {blog.fifth_topic && (
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 pt-8 text-center">
                {blog.fifth_topic}
              </h2>
            )}

            {(image || blog.images?.[5]) && (
              <img
                className="w-[450px] md:w-1/2 object-cover mx-auto"
                src={image || blog.images?.[5]}
                alt="image"
              />
            )}

            {blog.fifth_description && (
              <div className="text-gray-700 leading-relaxed mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {blog.fifth_description.split("\n").map((line, index) => {
                  if (line.trim().startsWith("*")) {
                    return (
                      <li key={index} className="list-disc ml-6">
                        {line.replace("*", "").trim()}
                      </li>
                    );
                  }
                  return (
                    <p key={index} className="mb-2">
                      {line.trim()}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
