import axios from "axios";
import { server } from "../../server";
export const loadAdmin = () => async (dispatch) => {
  debugger;
  try {
    dispatch({
      type: "LoadAdminRequest",
    });

    const { data } = await axios.get(`${server}/admin/get-admin`, {
      withCredentials: true,
    });
    console.log("Insdie action", data);

    dispatch({
      type: "LoadAdminSuccess",
      payload: data.admin,
    });
  } catch (error) {
    dispatch({
      type: "LoadAdminFail",
      payload: error.response.data.message,
    });
  }
};
