import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { add_blog, messageClear } from "../../store/reducers/blogReducer";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/Utils";

const AddBlog = () => {
  const dispatch = useDispatch();
  const { userInformaion } = useSelector((state) => state.auth);
  const { successMessage, errorMessage, loader } = useSelector((state) => state.blog);
  const [state, setState] = useState({
    name: "",
    title: "",
    description: "",
    brand: "",
    shopName: "",
    first_topic: "",
    first_description: "",
    second_topic: "",
    second_description: "",
    third_topic: "",
    third_description: "",
    forth_topic: "",
    forth_description: "",
    fifth_topic: "",
    fifth_description: "",
  });
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };

      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const logFormData = (formData) => {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const add = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("first_topic", state.first_topic);
    formData.append("first_description", state.first_description);
    formData.append("second_topic", state.second_topic);
    formData.append("second_description", state.second_description);
    formData.append("third_topic", state.third_topic);
    formData.append("third_description", state.third_description);
    formData.append("forth_topic", state.forth_topic);
    formData.append("forth_description", state.forth_description);
    formData.append("fifth_topic", state.fifth_topic);
    formData.append("fifth_description", state.fifth_description);
    formData.append("shopName", userInformaion.shopInformation?.shopName);
    formData.append("brand", state.brand);

    images.forEach((image) => {
      formData.append("images", image);
    });

    logFormData(formData); 

    dispatch(add_blog({ blog: formData }));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
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
      setImageShow([]);
      setImages([]);
    }
  }, [successMessage, errorMessage, dispatch]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Blog</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to="/seller/dashboard/blogs"
          >
            Blogs
          </Link>
        </div>
        <div>
          <form onSubmit={add}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setState({ ...state, name: e.target.value })}
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
                  onChange={(e) =>
                    setState({ ...state, brand: e.target.value })
                  }
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
                  onChange={(e) =>
                    setState({ ...state, title: e.target.value })
                  }
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
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, first_topic: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, first_description: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, second_topic: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, second_description: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, third_topic: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, third_description: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, forth_topic: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, forth_description: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, fifth_topic: e.target.value })
                }
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
                onChange={(e) =>
                  setState({ ...state, fifth_description: e.target.value })
                }
                value={state.fifth_description || ""}
                placeholder="fifth_description"
                name="fifth_description"
                id="fifth_description"
              ></textarea>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow.map((img, i) => (
                <div key={i} className="h-[180px] relative">
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                htmlFor="image"
              >
                <span>
                  <BsImages />
                </span>
                <span>select image</span>
              </label>
              <input
                multiple
                onChange={imageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Add blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
