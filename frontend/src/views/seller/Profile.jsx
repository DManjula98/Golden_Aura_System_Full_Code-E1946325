import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PropagateLoader, FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { overrideStyle } from "../../utils/Utils";
import {
  updateSellerProfile,
  profile_image_upload,
  messageClear,
  profile_information_add,
  updateSellerShopProfile,
  delete_seller,
  sellerUpdatePassword,
} from "../../store/reducers/authReducer";
import { create_stripe_connect_account } from "../../store/reducers/sellerReducer";

const Profile = () => {
  const [state, setState] = useState({
    province: "",
    district: "",
    shopName: "",
    city: "",
  });
  const dispatch = useDispatch();
  const { userInformaion, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isShopEditing, setIsShopEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(userInformaion?.name || "");
  const [updatedEmail, setUpdatedEmail] = useState(userInformaion?.email || "");
  const [updatedShopName, setUpdatedShopName] = useState(
    userInformaion.shopInformation?.shopName || ""
  );
  const [updatedProvince, setUpdatedProvince] = useState(
    userInformaion.shopInformation?.province || ""
  );
  const [updatedDistrict, setUpdatedDistrict] = useState(
    userInformaion.shopInformation?.district || ""
  );
  const [updatedCity, setUpdatedCity] = useState(
    userInformaion.shopInformation?.city || ""
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    new_password: "",
  });

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData)); 
    }
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(profile_information_add(state));
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value); 
  };
  const handleEmailChange = (e) => {
    setUpdatedEmail(e.target.value); 
  };

  const handleShopNameChange = (e) => {
    setUpdatedShopName(e.target.value); 
  };
  const handleProvinceChange = (e) => {
    setUpdatedProvince(e.target.value); 
  };

  const handleDistrictChange = (e) => {
    setUpdatedDistrict(e.target.value); 
  };

  const handleCityChange = (e) => {
    setUpdatedCity(e.target.value); 
  };

  const handleSaveChanges = () => {
    const updatedData = {
      id: userInformaion?._id,
      name: updatedName,
      email: updatedEmail,
    };
    console.log("Updated Data:", updatedData); 
    dispatch(updateSellerProfile(updatedData));
    setIsEditing(false);
  };

  const handleShopSaveChanges = () => {
    const updatedData = {
      id: userInformaion?._id,
      shopName: updatedShopName,
      province: updatedProvince,
      district: updatedDistrict,
      city: updatedCity,
    };
    console.log("Updated Data:", updatedData); 
    dispatch(updateSellerShopProfile(updatedData));
    setIsShopEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, new_password } = formData;

      if (!email || !password || !new_password) {
        alert("All fields are required!");
        return;
      }
      console.log("Updated Data:", formData); 
      dispatch(sellerUpdatePassword(formData));
    
      setFormData({
        email: "",
        password: "",
        new_password: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4  bg-[#283046] rounded-md text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              {userInformaion?.image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img
                    className="w-full h-full"
                    src={userInformaion?.image}
                    alt="Profile"
                  />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <button
                  onClick={() => dispatch(delete_seller(userInformaion._id))}
                  className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 absolute right-10 top-2 cursor-pointer"
                >
                  <FaTrash />
                </button>

                <span
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"
                >
                  <FaEdit />
                </span>
                <form>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <div className="flex flex-col w-full gap-1">
                      <label htmlFor="name">Name</label>
                      <input
                        className="outline-none px-3 py-1 border rounded-md text-slate-600"
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        value={updatedName || userInformaion?.name}
                        onChange={handleNameChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <label htmlFor="email">Email</label>
                    <input
                      className="outline-none px-3 py-1 border rounded-md text-slate-600"
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      value={updatedEmail || userInformaion?.email}
                      onChange={handleEmailChange}
                      disabled={!isEditing} 
                    />
                    <label htmlFor="role">Role</label>
                    <input
                      className="outline-none px-3 py-1 border rounded-md text-slate-600"
                      type="role"
                      placeholder="role"
                      name="role"
                      id="role"
                      value={userInformaion?.role}
                      disabled={!isEditing} 
                    />

                    <label htmlFor="status">Status : </label>
                    <input
                      className="outline-none px-3 py-1 border rounded-md text-slate-600"
                      type="status"
                      placeholder="status"
                      name="status"
                      id="status"
                      value={userInformaion?.status}
                      disabled={!isEditing} 
                    />

                    <div className="flex gap-2">
                      <span>Payment Account : </span>
                      <p>
                        {userInformaion.payment === "active" ? (
                          <span className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded ">
                            {userInformaion.payment}
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              dispatch(create_stripe_connect_account())
                            }
                            className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded "
                          >
                            click active
                          </span>
                        )}
                      </p>
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {!userInformaion?.shopInformation ? (
                <form onSubmit={add}>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="Shop">Shop Name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="shop name"
                      name="shopName"
                      id="Shop"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="div">Province</label>
                    <input
                      value={state.province}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="province"
                      name="province"
                      id="div"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="district">District</label>
                    <input
                      value={state.district}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="district"
                      name="district"
                      id="district"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="sub">City</label>
                    <input
                      value={state.city}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      placeholder="city"
                      name="city"
                      id="sub"
                    />
                  </div>
                  <button
                    disabled={loader ? true : false}
                    className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Update Info"
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span
                    onClick={() => setIsShopEditing(!isShopEditing)}
                    className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"
                  >
                    <FaEdit />
                  </span>
                  <form>
                    <div className="flex flex-col w-full gap-1 mb-3">
                      <div className="flex flex-col w-full gap-1">
                        <label htmlFor="shopname">Shop Name</label>
                        <input
                          className="outline-none px-3 py-1 border rounded-md text-slate-600"
                          type="text"
                          placeholder="Shop Name"
                          name="shopname"
                          id="shopname"
                          value={
                            updatedShopName ||
                            userInformaion.shopInformation?.shopName
                          }
                          onChange={handleShopNameChange}
                          disabled={!isShopEditing} 
                        />
                      </div>
                      <label htmlFor="province">Province</label>
                      <input
                        className="outline-none px-3 py-1 border rounded-md text-slate-600"
                        type="text"
                        placeholder="Province"
                        name="province"
                        id="provnce"
                        value={
                          updatedProvince ||
                          userInformaion.shopInformation?.province
                        }
                        onChange={handleProvinceChange}
                        disabled={!isShopEditing} 
                      />
                      <label htmlFor="district">District</label>
                      <input
                        className="outline-none px-3 py-1 border rounded-md text-slate-600"
                        type="text"
                        placeholder="District"
                        name="district"
                        id="district"
                        value={
                          updatedDistrict ||
                          userInformaion.shopInformation?.district
                        }
                        onChange={handleDistrictChange}
                        disabled={!isShopEditing} 
                      />

                      <label htmlFor="city">City</label>
                      <input
                        className="outline-none px-3 py-1 border rounded-md text-slate-600"
                        type="text"
                        placeholder="city"
                        name="city"
                        id="city"
                        value={
                          updatedCity || userInformaion.shopInformation?.city
                        }
                        onChange={handleCityChange}
                        disabled={!isShopEditing} 
                      />

                      {isShopEditing && (
                        <button
                          type="button"
                          onClick={handleShopSaveChanges}
                          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                          Save Changes
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0  ">
            <div className="bg-[#283046] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="new password"
                    name="new_password"
                    id="n_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5 ">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
