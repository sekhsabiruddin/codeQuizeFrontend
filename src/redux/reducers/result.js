import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  loading: false,
  error: null,
};

export const resultReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllResultRequest", (state) => {
      state.loading = true;
      state.error = null; // Reset error when making a new request
    })
    .addCase("getAllResultSuccess", (state, action) => {
      state.loading = false;
      state.results = action.payload.results; // Assuming payload structure includes "results"
    })
    .addCase("getAllResultFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
