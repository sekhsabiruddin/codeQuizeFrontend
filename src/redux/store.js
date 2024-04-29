import { configureStore } from "@reduxjs/toolkit";
import { questionReducer } from "./reducers/loadquestion"; // Import the correct reducer
import { getAllQuestionReducer } from "./reducers/allquestion";
import { userReducer } from "./reducers/user";
import { resultReducer } from "./reducers/result";
import { quizeModeReducer } from "./reducers/quizemode";
import { adminReducer } from "./reducers/admin";
const store = configureStore({
  reducer: {
    user: userReducer,
    quizeQuestion: questionReducer,
    allQuestion: getAllQuestionReducer,
    result: resultReducer,
    quizemode: quizeModeReducer,
    admin: adminReducer,
  },
});

export default store;
