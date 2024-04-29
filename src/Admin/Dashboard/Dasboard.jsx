import React, { useState } from "react";
// import Header from "../components/Layout/Header";
import styles from "../../styles/styles";

import DashBoardSideBar from "../DashBoardSideBar/DashBoardSideBar";
import DashBoardContent from "../DashBoardContent/DashBoardContent";

import { useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";

const Dasboard = () => {
  //   const { loading, user } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <>
      <AdminHeader />
      <div>
        <>
          <div
            className={`${styles.section} h-[90vh]  w-full flex bg-[#f5f5f5] `}
          >
            <div className="w-[20%]">
              <DashBoardSideBar active={active} setActive={setActive} />
            </div>
            <DashBoardContent active={active} />
          </div>
        </>
      </div>
    </>
  );
};

export default Dasboard;
