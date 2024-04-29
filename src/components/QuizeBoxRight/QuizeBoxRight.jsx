import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const QuizeBoxRight = () => {
  const quizeQuestions = useSelector((state) => state.quizeQuestion.questions);

  useState(() => {}, []);

  return (
    <div>
      <div className="grid grid-cols-3 p-3 w-full text-center">
        <div>
          <span>Solved</span>
          <span className="bg-[#12B76A] w-[15px] h-[15px] inline-block ml-2"></span>
        </div>
        <div>
          <span>Current</span>
          <span className="bg-[#dddddd] w-[15px] h-[15px] inline-block ml-2"></span>
        </div>
        <div>
          <span>Not Solved</span>
          <span className="bg-[#FB5353] w-[15px] h-[15px] inline-block ml-2"></span>
        </div>
      </div>

      <hr />
      <div className="flex justify-center m-10">
        <div className="w-[80%] gap-3 grid grid-cols-4">
          {quizeQuestions &&
            quizeQuestions.map((question, i) => (
              <button
                key={i}
                className={
                  question.status === "current"
                    ? "currentQuestion"
                    : question.useranswerindex !== null
                    ? "solveQuestion"
                    : question.status === "solved"
                    ? "solveQuestion"
                    : question.status === "unsolved"
                    ? "unsolvedQuestion"
                    : "buttonCss"
                }
                style={{ fontFamily: "roboto", fontWeight: 400 }}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div>
      <hr />
      <div className="p-2">
        <Link to="/result">
          <div
            className="text-center text-[1.1rem] opacity-100 hover:opacity-80"
            style={{ fontFamily: "Roboto", fontWeight: 400 }}
          >
            <input
              className="w-[60%] bg-[#3a24db] h-[40px] border border-[#3a24db] text-center rounded-[3px] mt-8 cursor-pointer text-[#fff]"
              type="submit"
              value="Submit"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuizeBoxRight;
