import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isQuizeMode: false,
};
export const quizeModeReducer = createReducer(initialState, (builder) => {
  builder.addCase("startTheQuize", (state) => {
    state.isQuizeMode = true;
  });
  builder.addCase("stopTheQuize", (state) => {
    state.isQuizeMode = false;
  });
});
