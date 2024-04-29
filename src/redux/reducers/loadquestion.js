import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  questions: [],
  error: "",
};

export const questionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadQuestionRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("loadQuestionSuccess", (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
      state.success = true;
    })
    .addCase("loadQuestionFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //====no action i am using directly
    .addCase("updateQuestionStatus", (state, action) => {
      const { id, status } = action.payload;
      state.questions = state.questions.map((question) => {
        if (question._id === id) {
          return { ...question, status };
        }
        return question;
      });
    }) // Remove the semicolon here
    //====no action i am using directly
    .addCase("updateQuestionAnswer", (state, action) => {
      const { id, useranswer } = action.payload; // Fix variable name here
      state.questions = state.questions.map((question) => {
        if (question._id === id) {
          return { ...question, useranswer };
        }
        return question;
      });
    })
    .addCase("updateQuestionIndex", (state, action) => {
      const { id, userindex } = action.payload; // Fix variable name here
      state.questions = state.questions.map((question) => {
        if (question._id === id) {
          return { ...question, useranswerindex: userindex };
        }
        return question;
      });
    });
});
