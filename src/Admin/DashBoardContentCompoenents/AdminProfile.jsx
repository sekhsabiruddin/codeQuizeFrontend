import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { server } from "../../server";
import { loadAdmin } from "../../redux/actions/admin";
import { useDispatch } from "react-redux";
import { backend_url } from "../../server";
import validator from "validator";
const AdminProfile = () => {
  const admin = useSelector((state) => state.admin.admin);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);

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
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.put(
        `${server}/admin/update-admin`,
        formData,
        {
          ...config,
          withCredentials: true,
        }
      );

      window.location.reload();

      setName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setAvatar(null);
      toast.success(response.data.message);
      dispatch(loadAdmin);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  useEffect(() => {
    if (admin) {
      setEmail(admin.email);
      setAddress(admin.address);
      setPhoneNumber(admin.phoneNumber);
      setName(admin.name);
    }
  }, [admin]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative mt-4">
          <img
            src={`${backend_url}${admin && admin.avatar}`}
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
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} aria-required={true}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
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
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
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
            className={`w-[250px] h-[40px] border bg-[#3a24db] text-center text-[#ffffff] rounded-[3px] mt-8 cursor-pointer transition-opacity duration-300 hover:opacity-75`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default AdminProfile;
