import axios from "axios";
import { server } from "../../server";

export const getAllQuestion = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllQuestionRequest",
    });

    const { data } = await axios.get(`${server}/question/get-all-questions`);
    console.log("All the question", data);

    dispatch({
      type: "getAllQuestionSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllQuestionFail",
      payload: error.response.data.message,
    });
  }
};
export const addQuestion = (question, options, answer) => async (dispatch) => {
  try {
    dispatch({
      type: "questionAddRequest",
    });

    const { data } = await axios.post(
      `${server}/question/add-question`,
      { question, options, answer } // Pass data as an object
    );
    dispatch({
      type: "questionCreateSuccess",
    });
  } catch (error) {
    dispatch({
      type: "questionCreateFail",
      payload: error.response.data.message,
    });
  }
};
export const updateQuestion =
  (questionId, { question, options, answer }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateQuestionRequest",
      });

      const { data } = await axios.put(
        `${server}/question/edit-question/${questionId}`,
        { question, options, answer } // Pass data as an object
      );
      dispatch({
        type: "updateQuestionSuccess",
      });
    } catch (error) {
      dispatch({
        type: "updateQuestionFail",
        payload: error.response.data.message,
      });
    }
  };
