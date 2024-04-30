import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Timer component
const Timer = ({ remainingTime }) => (
  <div className="px-8 flex justify-end">
    <div
      className="text-[1.8rem]"
      style={{ fontFamily: "Roboto", fontWeight: 400 }}
    >
      <span>{Math.floor(remainingTime / 60)}:</span>
      <span>
        {remainingTime % 60 < 10
          ? `0${remainingTime % 60}`
          : remainingTime % 60}
      </span>
    </div>
  </div>
);

const QuizeBoxLeft = () => {
  const quizeQuestions = useSelector((state) => state.quizeQuestion.questions);
  const { isQuizeMode } = useSelector((state) => state.quizemode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [status, setStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [useranswer, setUserAnswer] = useState(null);
  const [prevIndex, setPrevIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(600);

  // Memoize current question
  const currentQuestion = useMemo(
    () => quizeQuestions[currentQuestionIndex],
    [quizeQuestions, currentQuestionIndex]
  );

  // Timer effect
  useEffect(() => {
    if (isQuizeMode && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isQuizeMode, remainingTime]);

  // Result calculation effect
  useEffect(() => {
    if (remainingTime === 0) {
      dispatch({ type: "stopTheQuize" });
      navigate("/result");
    }
  }, [remainingTime, dispatch, navigate]);

  // Update question status effect
  useEffect(() => {
    if (currentQuestion) {
      dispatch({
        type: "updateQuestionStatus",
        payload: { id: currentQuestion._id, status: "current" },
      });
    }
  }, [currentQuestionIndex, status]);

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < quizeQuestions.length - 1) {
      let value = status ? "solved" : "unsolved";
      dispatch({
        type: "updateQuestionStatus",
        payload: { id: currentQuestion._id, status: value },
      });
      dispatch({
        type: "updateQuestionAnswer",
        payload: { id: currentQuestion._id, useranswer: useranswer },
      });
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setPrevIndex(prevIndex + 1);
      setStatus(false);
      setSelectedOption(null);
    }
  };

  // Handle previous question
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      let value = null;
      if (currentQuestionIndex !== prevIndex) {
        value =
          status || currentQuestion.useranswerindex !== null
            ? "solved"
            : "unsolved";
      }
      dispatch({
        type: "updateQuestionStatus",
        payload: { id: currentQuestion._id, status: value },
      });
      dispatch({
        type: "updateQuestionAnswer",
        payload: { id: currentQuestion._id, useranswer: useranswer },
      });
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setStatus(false);
      setSelectedOption(null);
    }
  };

  // Handle option selection
  const handleOption = (e, index) => {
    setStatus(true);
    setSelectedOption(index);
    setUserAnswer(e.target.innerText);
    dispatch({
      type: "updateQuestionIndex",
      payload: { id: currentQuestion._id, userindex: index },
    });
    if (quizeQuestions.length === 16) {
      dispatch({
        type: "updateQuestionAnswer",
        payload: { id: currentQuestion._id, useranswer: e.target.innerText },
      });
    }
  };

  return (
    <div className="h-[100%]  p-4 quizeBoxShadow">
      {isQuizeMode && <Timer remainingTime={remainingTime} />}
      <div className="flex align-center justify-center mt-3">
        {currentQuestion && (
          <div className="w-[100%] lg:h-[300px] lg:w-[70%] lg:px-3">
            <h2
              className="text-[1.4rem] mb-3"
              style={{ fontFamily: "Open Sans", fontWeight: 500 }}
            >
              {currentQuestionIndex + 1}.{currentQuestion.question}
            </h2>
            <div className="mt-8">
              {currentQuestion.options.map((option, index) => (
                <div
                  className={`optionBorder px-3 py-2 cursor-pointer mt-4 ${
                    selectedOption === index ||
                    currentQuestion.useranswerindex == index
                      ? "bg-[#00969F] text-[#fff]"
                      : ""
                  }`}
                  key={index}
                  onClick={(e) => handleOption(e, index)}
                >
                  <span className="ml-2">{option}</span>
                </div>
              ))}
            </div>
            <div
              className="flex justify-between mt-10"
              style={{ fontFamily: "Roboto", fontWeight: 400 }}
            >
              <button
                className="bg-[#00246B] rounded-sm text-[#fff] px-8 py-1 flex items-center opacity-100 hover:opacity-80"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
              >
                <i className="mr-2">
                  <FaArrowLeft />
                </i>
                <span className="text-[1.1rem]"> Prev</span>
              </button>
              <button
                className="bg-[#00246B] rounded-sm text-[#fff] px-8 py-1 flex items-center opacity-100 hover:opacity-80"
                onClick={handleNext}
                disabled={currentQuestionIndex === quizeQuestions.length - 1}
              >
                <span className="text-[1.1rem]"> Next</span>
                <i className="ml-2">
                  <FaArrowRight />
                </i>
              </button>
            </div>
            {/* submit button start here  */}
            <div className="p-2 lg:hidden">
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
            {/* submit button start end  */}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizeBoxLeft;
