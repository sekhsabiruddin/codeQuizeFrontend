import axios from "axios";
import { server } from "../../server";

export const loadQuestions = () => async (dispatch) => {
  try {
    dispatch({ type: "loadQuestionRequest" });

    const response = await axios.get(`${server}/question/get-random-question`);
    console.log("Response data", response);

    const mainData = response.data.map((value, index) => {
      if (index == 0) {
        return { ...value, status: "current" };
      }
      return { ...value };
    });

    dispatch({
      type: "loadQuestionSuccess",
      payload: mainData,
    });
  } catch (error) {
    dispatch({
      type: "loadQuestionFailure",
      payload: error.response.data.message,
    });
  }
};
