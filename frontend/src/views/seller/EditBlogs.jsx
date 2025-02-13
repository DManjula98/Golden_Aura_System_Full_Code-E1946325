import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { get_category } from "../../store/reducers/categoryReducer";
import {
  get_blog,
  messageClear,
  update_blog,
  blog_image_update,
} from "../../store/reducers/blogReducer";
import { overrideStyle } from "../../utils/Utils";

const EditBlogs = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { blog, loader, errorMessage, successMessage } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, [dispatch]);

  const [state, setState] = useState({
    name: "",
    title: "",
    description: "",
    brand: "",
    shopName: "",
    fifth_topic: "",
    first_description: "",
    second_topic: "",
    second_description: "",
    third_topic: "",
    third_description: "",
    forth_topic: "",
    forth_description: "",
    first_topic: "",
    fifth_description: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(get_blog(blogId));
  }, [blogId, dispatch]);

  const [searchValue, setSearchValue] = useState("");

  const [imageShow, setImageShow] = useState([]);

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        blog_image_update({
          oldImage: img,
          newImage: files[0],
          blogId,
        })
      ).then(() => {
        dispatch(get_blog(blogId));
      });
    }
  };

  useEffect(() => {
    if (blog) {
      setState({
        name: blog.name,
        title: blog.title,
        description: blog.description,
        brand: blog.brand,
        first_topic: blog.first_topic,
        first_description: blog.first_description,
        second_topic: blog.second_topic,
        second_description: blog.second_description,
        third_topic: blog.third_topic,
        third_description: blog.third_description,
        forth_topic: blog.forth_topic,
        forth_description: blog.forth_description,
        fifth_topic: blog.fifth_topic,
        fifth_description: blog.fifth_description,
      });

      setImageShow(blog.images);
    }
  }, [blog]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const update = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,

      brand: state.brand,

      title: state.title,
      description: state.description,
      brand: state.brand,
      first_topic: state.first_topic,
      first_description: state.first_description,
      second_topic: state.second_topic,
      second_description: state.second_description,
      third_topic: state.third_topic,
      third_description: state.third_description,
      forth_topic: state.forth_topic,
      forth_description: state.forth_description,
      fifth_topic: state.fifth_topic,
      fifth_description: state.fifth_description,
      blogId,
    };
    dispatch(update_blog(obj));
  };
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Edit Blog</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to="/seller/dashboard/blogs"
          >
            Blogs
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product brand</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">title</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.title}
                  type="text"
                  placeholder="product title"
                  name="title"
                  id="title"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.description}
                placeholder="description"
                name="description"
                id="description"
              ></textarea>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="first_topic">First Topic</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.first_topic}
                type="text"
                placeholder="first topic"
                name="first_topic"
                id="first_topic"
              />
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="first_description">First Description</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.first_description}
                placeholder="first_description"
                name="first_description"
                id="first_description"
              ></textarea>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="second_topic">Second Topic</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.second_topic}
                type="text"
                placeholder="second_topic"
                name="second_topic"
                id="second_topic"
              />
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="second_description">Second Description</label>
              <textarea
                rows={10}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.second_description || ""}
                placeholder="second_description"
                name="second_description"
                id="second_description"
              ></textarea>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="third_topic">Third Topic</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.third_topic}
                type="text"
                placeholder="third_topic"
                name="third_topic"
                id="third_topic"
              />
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="third_description">Third Description</label>
              <textarea
                rows={10}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.third_description || ""}
                placeholder="third_description"
                name="third_description"
                id="third_description"
              ></textarea>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="forth_topic">Fourth Topic</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.forth_topic}
                type="text"
                placeholder="forth_topic"
                name="forth_topic"
                id="forth_topic"
              />
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="forth_description">Fourth Description</label>
              <textarea
                rows={10}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.forth_description || ""}
                placeholder="forth_description"
                name="forth_description"
                id="forth_description"
              ></textarea>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="fifth_topic">Fifth Topic</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.fifth_topic}
                type="text"
                placeholder="fifth_topic"
                name="fifth_topic"
                id="fifth_topic"
              />
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="fifth_description">Fifth Description</label>
              <textarea
                rows={10}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.fifth_description}
                placeholder="fifth_description"
                name="fifth_description"
                id="fifth_description"
              ></textarea>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div key={img}>
                    <label className="h-[180px]" htmlFor={i}>
                      <img className="h-full" src={img} alt="" />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                  </div>
                ))}
            </div>

            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Update Blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogs;
