import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import medal from "../../assets/medal.png";
import { MdOutlineFeedback } from "react-icons/md";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const logoutHandle = async () => {
    console.log("Hi....");
    try {
      const { data } = await axios.post(`${server}/user/logout`, null, {
        withCredentials: true,
      });

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div
      className="lg:w-[220px] bg-white shadow-sm h-[90vh]  p-4 pt-8"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div
        className="flex items-center cursor-pointer w-full mb-8 "
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : "black"} />
        <span
          className={`hidden lg:block pl-3 ${
            active === 1 ? "text-[red]" : "text-black"
          } `}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <img
          src={medal}
          style={{ width: "20px" }}
          color={active === 2 ? "red" : "black"}
        />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 2 ? "text-[red]" : "text-black"
          } `}
        >
          Contest
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <BsFileEarmarkBarGraph
          size={20}
          color={active === 3 ? "red" : "black"}
        />
        <span
          className={`hidden lg:block pl-3 ${
            active === 3 ? "text-[red]" : "text-black"
          } `}
        >
          Performance
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4)}
      >
        <RiLockPasswordLine size={20} color={active === 4 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 4 ? "text-[red]" : "text-black"
          } `}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineFeedback size={20} color={active === 5 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 5 ? "text-[red]" : "text-black"
          } `}
        >
          FeedBack
        </span>
      </div>

      <div
        className="single_item  flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandle}
      >
        <AiOutlineLogin size={20} color={active === 6 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 6 ? "text-[red]" : "text-black"
          } `}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
