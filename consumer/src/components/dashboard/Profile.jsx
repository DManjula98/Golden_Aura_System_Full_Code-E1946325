import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  customer_profile_image_upload,
  messageClear,
  updateProfile,
  delete_customer,
  updatePassword,
} from "../../store/reducers/authReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInformation, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(userInformation?.name || "");
  const [updatedEmail, setUpdatedEmail] = useState(
    userInformation?.email || ""
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    new_password: "",
  });

  useEffect(() => {
    if (userInformation) {
      setUpdatedName(userInformation.name);
      setUpdatedEmail(userInformation.email);
    }
  }, [userInformation]);

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(customer_profile_image_upload(formData));
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

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUpdatedEmail(e.target.value);
  };

  const handleSaveChanges = () => {
    const updatedData = {
      id: userInformation.id,
      name: updatedName,
      email: updatedEmail,
    };
    console.log("Updated Data:", updatedData);
    dispatch(updateProfile(updatedData));
    setIsEditing(false);
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
      dispatch(updatePassword(formData));
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
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full">
          <div className="w-full h-full p-4  bg-white rounded-md text-black">
            <div className="flex justify-center items-center py-3">
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-100 rounded-md relative">
                <button
                  onClick={() => dispatch(delete_customer(userInformation.id))}
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
                <h1 className="text-xl text-slate-600 pb-5">
                  Customer Profile Information
                </h1>
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
                        value={updatedName || userInformation.name}
                        //onChange={handleNameChange}
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
                      value={updatedEmail || userInformation.email}
                      onChange={handleEmailChange}
                      disabled={!isEditing}
                    />
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
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-10">
          <div className="w-full pl-0 mt-6 md:mt-0  ">
            <div className="bg-white rounded-md text-black p-4">
              <h1 className="text-xl text-slate-600 pb-5">Change Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="outline-none px-3 py-1 border rounded-md text-slate-600"
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
                    className="outline-none px-3 py-1 border rounded-md text-slate-600"
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
                    className="outline-none px-3 py-1 border rounded-md text-slate-600"
                    type="password"
                    placeholder="new password"
                    name="new_password"
                    id="n_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="bg-purple-500 shadow-lg hover:shadow-purple-500/30 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5 ">
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
