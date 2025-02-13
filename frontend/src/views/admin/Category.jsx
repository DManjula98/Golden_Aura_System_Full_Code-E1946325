import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import Pagination from "../pagination";
import { BsImage } from "react-icons/bs";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { overrideStyle } from "../../utils/Utils";
import {
  categoryAdd,
  messageClear,
  get_category,
  delete_category,
} from "../../store/reducers/categoryReducer";
import Search from "../components/Search";

const Category = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categories } = useSelector(
    (state) => state.category
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImage] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
    subcategories: [], 
  });

  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
  };

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const addSubcategory = () => {
    setState({
      ...state,
      subcategories: [...state.subcategories, { name: "", image: "" }],
    });
  };

  const handleSubcategoryChange = (index, field, value) => {
    const newSubcategories = [...state.subcategories];
    newSubcategories[index][field] = value;
    setState({
      ...state,
      subcategories: newSubcategories,
    });
  };

  const removeSubcategory = (index) => {
    const newSubcategories = state.subcategories.filter((_, i) => i !== index);
    setState({
      ...state,
      subcategories: newSubcategories,
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
      setState({
        name: "",
        image: "",
        subcategories: [],
      });
      setImage("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md ">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Categories</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full ">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#283046] rounded-md">
            <Search
              setParPage={setParpage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-[#d0d2d6]">
                <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Subcategories
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, i) => (
                    <tr key={category.id}>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={category.image}
                          alt=""
                        />
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{category.name}</span>
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <ul>
                          {category.subcategories.map((subcategory, index) => (
                            <li key={index}>{subcategory.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                        <Link to={`/admin/dashboard/edit-category/${category._id}`} className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() =>
                              dispatch(delete_category(category._id))
                            }
                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={4}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6] ">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center">
                  Add Category
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className="block lg:hidden cursor-pointer"
                >
                  <GrClose className=" text-[#d0d2d6]" />
                </div>
              </div>
              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Category Name</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                  required
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Subcategories</h3>
                  {state.subcategories.map((subcategory, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        value={subcategory.name}
                        onChange={(e) =>
                          handleSubcategoryChange(index, "name", e.target.value)
                        }
                        className="px-2 py-1 bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                        type="text"
                        placeholder={`Subcategory ${index + 1}`}
                        required
                      />
                      <input
                        onChange={(e) =>
                          handleSubcategoryChange(
                            index,
                            "image",
                            e.target.files[0]
                          )
                        }
                        className="hidden"
                        type="file"
                        id={`subImage-${index}`}
                      />
                      <label
                        htmlFor={`subImage-${index}`}
                        className="cursor-pointer bg-blue-500 px-2 py-1 rounded-md text-white"
                      >
                        <BsImage />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSubcategory(index)}
                        className="bg-red-500 px-2 py-1 rounded-md text-white"
                      >
                        <GrClose />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSubcategory}
                    className="bg-green-500 w-full text-white rounded-md px-4 py-2"
                  >
                    Add Subcategory
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    disabled={loader ? true : false}
                    className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Add Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
