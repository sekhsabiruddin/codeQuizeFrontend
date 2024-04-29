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
import { CiBookmarkPlus } from "react-icons/ci";
import { MdOutlineDataset } from "react-icons/md";
import { useSelector } from "react-redux";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { TiStarburst } from "react-icons/ti";
import { FaHourglassStart } from "react-icons/fa";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const DashBoardSideBar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.post(`${server}/admin/logout`, null, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      toast.success("Logged out successfully");

      // Assuming you're using some kind of navigation library like react-router-dom
      navigate("/login-admin");
    } catch (error) {
      // Handle error if logout fails
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div
      className="lg:w-[220px] bg-white shadow-sm h-[90vh]  p-4 pt-8"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div
        className="flex items-center cursor-pointer w-full mb-8"
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
        <MdOutlineDataset size={20} color={active === 2 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 2 ? "text-[red]" : "text-black"
          } `}
        >
          All Question
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <CiBookmarkPlus size={20} color={active === 3 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 3 ? "text-[red]" : "text-black"
          } `}
        >
          Add Question
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4)}
      >
        <TiStarburst size={20} color={active === 4 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 4 ? "text-[red]" : "text-black"
          } `}
        >
          Piority
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <FaHourglassStart size={20} color={active === 5 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 5 ? "text-[red]" : "text-black"
          } `}
        >
          All Piority
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 6 ? "text-[red]" : "text-black"
          } `}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 7 ? "text-[red]" : "text-black"
          } `}
        >
          User Feedback
        </span>
      </div>

      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        // onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : "black"} />
        <span
          className={`hidden lg:block  pl-3 ${
            active === 8 ? "text-[red]" : "text-black"
          } `}
          onClick={logoutHandler}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
