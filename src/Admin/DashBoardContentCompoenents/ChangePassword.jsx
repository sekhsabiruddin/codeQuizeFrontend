import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import validator from "validator";
import Loading from "../../components/Loading/Loading";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLaoaing] = useState(false);
  if (loading) {
    return <Loading />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLaoaing(true);
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
        `${server}/admin/change-password`,
        {
          oldPassword,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    setLaoaing(false);
  };

  return (
    <div className="h-full flex align-center justify-center">
      <div className="w-[95%] lg:w-[70%] my-3 bg-[#fff]">
        <form className="space-y-6 p-3" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password:
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="oldPassword"
                name="oldPassword"
                autoComplete="current-password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="input-field appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password:
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="newPassword"
                name="newPassword"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password:
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="text-center">
            <input
              className="w-[50%] bg-[#3a24db] h-[40px] border border-[#3a24db] text-center  rounded-[3px] mt-8 cursor-pointer text-[#fff]"
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
