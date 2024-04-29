import Contest from "./AllProfileComponent/Contest";
import Performance from "./AllProfileComponent/Performance";
import MainProfile from "./AllProfileComponent/MainProfile";
import ChangePassword from "./AllProfileComponent/ChangePassword";
import Feedback from "./AllProfileComponent/Feedback";
import { useEffect } from "react";
import { loadUser } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const ProfileContent = ({ active }) => {
  return (
    <div className="w-full">
      {active === 1 && <MainProfile />}
      {active === 2 && <Contest />}
      {active === 3 && <Performance />}
      {active === 4 && <ChangePassword />}
      {active === 5 && <Feedback />}
    </div>
  );
};

export default ProfileContent;
