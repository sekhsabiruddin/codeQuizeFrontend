import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for displaying toast messages
import { backend_url, server } from "../../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { loadUser } from "../../../redux/actions/user";
import validator from "validator";
const MainProfile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [componnentLoading, setComponnentLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
    }
  }, [user, componnentLoading]);

  if (loading || !user) {
    return <Loading />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!address.trim()) {
      toast.error("Address cannot be empty");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validator.isMobilePhone(phoneNumber, "any", { strictMode: false })) {
      toast.error("Invalid phone number");
      return;
    }
    const formData = new FormData();
    formData.append("file", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.put(`${server}/user/update-user`, formData, {
        ...config,
        withCredentials: true,
      });

      localStorage.setItem("showToast", "true");
      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const showToast = localStorage.getItem("showToast");
    if (showToast === "true") {
      toast.success("Your profile has been updated successfully!");
      localStorage.removeItem("showToast");
    }
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={`${backend_url}${user && user.avatar}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt="userImg"
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-3 lg:px-5">
        <form onSubmit={handleSubmit} aria-required={true}>
          <div className="grid lg:grid-cols-2">
            <div className="w-full 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="w-full 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="w-full 800px:w-[50%]">
              <label className="block pb-2">Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default MainProfile;
