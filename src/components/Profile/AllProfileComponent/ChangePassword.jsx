import React, { useState } from "react";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import validator from "validator";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setnConfirmPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isLength(password, { min: 6 })) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    // Validate confirm password length
    if (!validator.isLength(confirmPassword, { min: 6 })) {
      toast.error("Confirm password should be at least 6 characters long");
      return;
    }

    // Validate if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }
    axios
      .post(
        `${server}/user/change-password`,
        {
          oldPassword,
          password,
          confirmPassword,
        },
        {
          withCredentials: true, // Corrected the typo
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOldPassword("");
        setpassword("");
        setnConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="h-full flex align-center justify-center">
      <div className="w-[95%] lg:w-[70%] my-3 bg-[#fff]">
        <form className="space-y-6 p-3" onSubmit={handleSubmit}>
          {/* 1st input filed */}
          <div>
            <label
              htmlFor="oldpassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password :
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={oldPassword}
                required
                onChange={(e) => setOldPassword(e.target.value)}
                className="appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* 2nd input filed */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password :
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={password}
                required
                onChange={(e) => setpassword(e.target.value)}
                className="appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* 2nd input filed */}
          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confrim Password :
            </label>
            <div className="mt-1">
              <input
                type="confirmpassword"
                value={confirmPassword}
                required
                onChange={(e) => setnConfirmPassword(e.target.value)}
                className="appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="text-center">
            <input
              className="w-[50%] bg-[#3a24db] h-[40px] border border-[#3a24db] text-center rounded-[3px] mt-8 cursor-pointer text-[#fff] hover:opacity-80 transition-opacity duration-300"
              required
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
