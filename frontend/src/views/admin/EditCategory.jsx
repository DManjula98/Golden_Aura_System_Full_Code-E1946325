import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  category_image_update,
  get_category_by_Id,
  messageClear,
  update_category,
} from "../../store/reducers/categoryReducer";
import { overrideStyle } from "../../utils/Utils";

const EditCategory = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { category, loader, errorMessage, successMessage } = useSelector(
    (state) => state.category
  );

  const [state, setState] = useState({
    name: "",
    subcategories: [],
    image: "",
  });

  const [file, setFile] = useState(null);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(get_category_by_Id(categoryId));
  }, [categoryId, dispatch]);

  const [imageShow, setImageShow] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImage = files[0];
      console.log("Uploading file:", newImage);

      dispatch(
        category_image_update({
          oldImage: state.image, 
          newImage,
          categoryId,
        })
      )
        .then(() => {
          console.log("Image updated, fetching category...");
          return dispatch(get_category_by_Id(categoryId)); 
        })
        .then(({ payload }) => {
          console.log("Updated category:", payload);
          if (payload.category && payload.category.image) {
            setState((prevState) => ({
              ...prevState,
              image: payload.category.image, 
            }));
          }
        })
        .catch((error) => {
          console.error("Error during image update:", error);
        });
    }
  };

  useEffect(() => {
    if (category) {
      setState({
        name: category.name,
        subcategories: Array.isArray(category.subcategories)
          ? category.subcategories.map((sub) => sub.name)
          : [], 
        image: category.image || "",
      });
    }
  }, [category]);

  const update = (e) => {
    e.preventDefault();

    const transformedSubcategories = state.subcategories.map((name) => ({
      name: name.trim(),
      image: "", 
      slug: name.trim().toLowerCase().replace(/\s+/g, "-"), 
    }));

    const obj = {
      id: categoryId,
      name: state.name,
      subcategories: transformedSubcategories,
      image: state.image,
    };

    dispatch(update_category(obj)).then(() => {
      dispatch(get_category_by_Id(categoryId));
    });
  };

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
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">
            Edit Category
          </h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to="/admin/dashboard/category"
          >
            All Categories
          </Link>
        </div>
        <form onSubmit={update}>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="name">Category Name</label>
              <input
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.name}
                type="text"
                placeholder="Category name"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="subcategories">Subcategories</label>
              <textarea
                rows={15}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={(e) =>
                  setState({
                    ...state,
                    subcategories: e.target.value.split("\n"),
                  })
                }
                value={(state.subcategories || []).join("\n")} 
                placeholder="Enter subcategories, one per line"
                name="subcategories"
                id="subcategories"
              />
            </div>
          </div>

          <div className="flex">
            <button
              disabled={loader ? true : false}
              className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Update Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
