import React from "react";
import AdminProfile from "../DashBoardContentCompoenents/AdminProfile";
import AllQuestion from "../DashBoardContentCompoenents/AllQuestion";
import AddQuestion from "../DashBoardContentCompoenents/AddQuestion";
import Priority from "../DashBoardContentCompoenents/Piority";
import ChangePassword from "../DashBoardContentCompoenents/ChangePassword";
import FeedbackTable from "../DashBoardContentCompoenents/FeedbackTable";

const DashBoardContent = ({ active }) => {
  return (
    <>
      <div className="w-full">
        {active === 1 ? <AdminProfile /> : ""}
        {active === 2 ? <AllQuestion /> : ""}
        {active === 3 ? <AddQuestion /> : ""}
        {active === 4 ? <Priority /> : ""}
        {active === 6 ? <ChangePassword /> : ""}
        {active === 7 ? <FeedbackTable /> : ""}
      </div>
    </>
  );
};

export default DashBoardContent;
