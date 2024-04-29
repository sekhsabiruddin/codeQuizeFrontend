import React, { useState } from "react";
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";

const ProfilePage = () => {
  const { loading, user } = useSelector((state) => state.user);
  const [quizMode, setQuizMode] = useState(false); // corrected variable name

  const [active, setActive] = useState(1);

  return (
    <div>
      <Header />
      <div className={`${styles.section}  h-[90vh] w-full flex bg-[#f5f5f5] `}>
        <div className="w-[20%] ">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
