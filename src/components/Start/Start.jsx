import React from "react";
import { useDispatch } from "react-redux";
const Start = () => {
  const dispatch = useDispatch();
  const handleStart = () => {
    dispatch({ type: "startTheQuize" });
  };
  return (
    <div className="border-opacity-0 w-full h-[90vh]">
      <div className="w-[95%] lg:w-[60%] px-4 py-3 mx-auto h-[90vh] bg-[#fff] text-[#877d7d]">
        <h1 className="mb-1 text-[1.1rem]">
          1. Welcome to <b className="text-[#000000cc]">CoderQuiz</b>
        </h1>
        <h1 className="mb-1 text-[1.1rem]">
          2. This application is a <b className="text-[#000000cc]">MERN</b>
          stack quiz.
        </h1>
        <h1 className="mb-1 text-[1.1rem]">
          3. Press the <b className="text-[#000000cc]">Next and Prev</b> buttons
          to navigate the questions.
        </h1>
        <h1 className="mb-1 text-[1.1rem]">
          4. <b className="text-[#000000cc]">Do not refres</b>h the page. If you
          do, your progress will be erased, and you will not be able to resume.
        </h1>
        <h1 className="mb-1 text-[1.1rem]">
          5. Every time, we fetch a{" "}
          <b className="text-[#000000cc]">unique question from the database.</b>
        </h1>
        <h1 className="mb-1 text-[1.1rem]">
          6. Each question is worth <b className="text-[#000000cc]">1 mark.</b>
        </h1>
        <h1 className="mb-1 text-[1.1rem]">
          7. You will receive <b className="text-[#000000cc]">16 questions</b>
          and <b className="text-[#000000b0]">have 10 minutes.</b> Only press
          the
          <b className="text-[#000000cc]"> submit button </b> when you have
          finished your test.
        </h1>
        <div className="text-center mt-10">
          <input
            className={`w-[200px] text-[1.2rem] h-[40px] border bg-[#3a24db] text-center text-[#fff] rounded-[3px] mt-8 cursor-pointer hover:bg-[#1e0d92] hover:text-[#fff]`}
            value="Start"
            type="submit"
            onClick={handleStart}
            style={{ fontFamily: "Roboto", fontWeight: 400 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Start;
