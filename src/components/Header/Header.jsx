import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
const Header = () => {
  const user = useSelector((state) => state.user.user);
  console.log("Header user", user);
  return (
    <div className="h-[10vh] py-2 px-2 sm:py-2 sm:px-10 bg-[#3321C8] w-full">
      <nav className="flex justify-between w-full">
        <div className="h-[8vh] w-[200px] flex item-center justify-center">
          <img src={Logo} alt="" className="w-full h-full" />
        </div>
        {/* //nav-iteam */}
        <div className="flex gap-3">{/* <Navbar /> */}</div>
        <div>
          <Link to="/profile">
            {user.avatar ? (
              <img
                src={`${backend_url}${user.avatar}`}
                alt=""
                className="w-[40px] h-[40px] rounded-full border-[3px] border-[#0eae88]"
              />
            ) : (
              <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
