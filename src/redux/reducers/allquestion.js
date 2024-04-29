import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  questions: [],
  error: "",
};

export const getAllQuestionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllQuestionRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllQuestionSuccess", (state, action) => {
      state.isLoading = false;
      state.questions = action.payload; // Assuming payload contains an array of questions
      state.error = ""; // Reset error on success
    })
    .addCase("getAllQuestionFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //===============Add question start=====================
    .addCase("questionAddRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("questionCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
    })
    .addCase("questionCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //===============Add question end=====================
    //==================update question start=======================
    .addCase("updateQuestionRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateQuestionSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
    })
    .addCase("updateQuestionFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    });
  //==================update question end=======================
});
