import axios from "axios";
import { server } from "../../server";

export const getAllResult = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllResultRequest",
    });

    const { data } = await axios.get(`${server}/result/get-result`, {
      withCredentials: true, // Include cookies in the request
    });
    console.log("Result data", data);
    dispatch({
      type: "getAllResultSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllResultFail",
      payload: error.response.data.message,
    });
  }
};
