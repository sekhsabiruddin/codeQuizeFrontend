import React from "react";
import { useState } from "react";
import QuizeBoxLeft from "../components/QuizeBoxLeft/QuizeBoxLeft";
import QuizeBoxRight from "../components/QuizeBoxRight/QuizeBoxRight";
import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";
import Start from "../components/Start/Start";
import Header from "../components/Header/Header";
const QuizeBox = () => {
  const { loading, user } = useSelector((state) => state.user);
  const { isQuizeMode } = useSelector((state) => state.quizemode);
  console.log("isQuizeMode", isQuizeMode);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className={`grid  grid-cols-12  h-[90vh]`}>
        <div className="col-span-12 lg:col-span-8">
          <QuizeBoxLeft />
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <QuizeBoxRight />
        </div>
        {isQuizeMode ? null : ( // If quizMode is true, don't render the Start component
          <div
            className="col-span-12 fixed left-0 right-0  flex align-center bg-[#06050565] justify-center"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <Start />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizeBox;
