import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import congratulation from "../../assets/congratulation.png";
import congratulationSound from "../../audio/contragtulation_sound.mp3";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useDispatch } from "react-redux";
import { RiFontFamily } from "react-icons/ri";

const Result = () => {
  let song = new Audio("../../audio/contragtulation_sound.mp3");

  const quizeQuestions = useSelector((state) => state.quizeQuestion.questions);
  const user = useSelector((state) => state.user.user);
  const { isQuizeMode } = useSelector((state) => state.quizemode);

  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [unsolvedCount, setUnsolvedCount] = useState(0);
  const [notAttend, setNotAttend] = useState(0);

  useEffect(() => {
    let song = new Audio(congratulationSound);

    if (quizeQuestions && quizeQuestions.length > 0) {
      let newScore = 0;
      let newSolvedCount = 0;
      let newUnsolvedCount = 0;
      let newNotAttend = 0;

      quizeQuestions.forEach((question) => {
        if (
          question.useranswer &&
          question.useranswer.trim().toLowerCase() ===
            question.answer.trim().toLowerCase()
        ) {
          newScore++;
        }

        if (question.status === "solved") {
          newSolvedCount++;
        }

        if (question.status === "unsolved") {
          newUnsolvedCount++;
        }

        if (question.useranswer === null) {
          newNotAttend++;
        }
      });

      setScore(newScore);
      setSolvedCount(newSolvedCount);
      setUnsolvedCount(newUnsolvedCount);
      setNotAttend(newNotAttend);

      if (isQuizeMode) {
        resultPost(
          user._id,
          newScore,
          newSolvedCount,
          newUnsolvedCount,
          newNotAttend
        );
        song.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      }
    }
  }, [quizeQuestions]); // Only fetch data when quizeQuestions changes

  async function resultPost(myUserId, score, solved, unsolved, not_attend) {
    try {
      const response = await axios.post(`${server}/result/create-result`, {
        myUserId,
        score,
        solved,
        unsolved,
        not_attend,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleTheCross = () => {
    navigate("/");
    window.location.reload(true);
  };

  return (
    <>
      <Confetti />
      <div className="border-8 resultContainer w-full flex items-center justify-center h-screen">
        <div className="w-[95%] lg:w-[80%] relative bg-[#fff] h-[90vh]">
          <div className="absolute right-1 text-7xl hover:text-blue-500 cursor-pointer">
            <IoIosCloseCircleOutline
              size={30}
              color={"red"}
              onClick={handleTheCross}
            />
          </div>
          <h2
            className="text-center text-bold mt-4 text-[2rem] text-[#0DC143] text-semibold"
            style={{ fontFamily: "Roboto" }}
          >
            Your Score is: {score}
          </h2>
          <div className="flex items-center justify-center mt-4">
            <img src={congratulation} alt="" className="h-[90%] w-[400px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
