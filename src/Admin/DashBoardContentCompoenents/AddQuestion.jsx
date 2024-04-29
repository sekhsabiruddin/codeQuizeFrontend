import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../redux/actions/allquestion";
import { getAllQuestion } from "../../redux/actions/allquestion";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { CiBookmarkPlus } from "react-icons/ci";
import { CgOverflow } from "react-icons/cg";
const AddQuestion = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!option1 || !option2 || !option3 || !option4) {
      toast.error("Please fill in all options");
      return;
    }

    if (![option1, option2, option3, option4].includes(correctAnswer)) {
      toast.error("Correct answer must be one of the options");
      return;
    }

    await dispatch(
      addQuestion(question, [option1, option2, option3, option4], correctAnswer)
    );

    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
    toast.success("Question added successfully");
    dispatch(getAllQuestion());
  };

  return (
    <div className="w-full h-full " style={{ overflow: "hidden" }}>
      <div className="flex w-full my-2 lg:my-5 justify-center">
        <div className="w-[95%] p-3 lg:w-[90%] questionBoxShadow lg:py-5 lg:px-5">
          <div>
            <form onSubmit={handleSubmit} aria-required={true}>
              <div>
                <h2 className="text-center text-[2rem]">Add Question</h2>
              </div>
              <div className="grid grid-cols-1">
                <div className="w-[100%]">
                  <label className="block pb-2">Question: </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="w-full 800px:w-[50%]">
                  <label className="block pb-2">Option 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  />
                </div>

                <div className="w-full 800px:w-[50%]">
                  <label className="block pb-2">Option 2</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="w-full 800px:w-[50%]">
                  <label className="block pb-2">Option 3</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                  />
                </div>

                <div className="w-full 800px:w-[50%]">
                  <label className="block pb-2">Option 4</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="w-[100%]">
                  <label className="block pb-2"> Correct Answer</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <input
                  className="w-[250px] h-[40px]  bg-[#3a24db]  border border-[#3a24db] text-center rounded-[3px] mt-8 cursor-pointer text-[#fff] hover:opacity-80 transition-opacity duration-300"
                  required
                  value="Submit"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
