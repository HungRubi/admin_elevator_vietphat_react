import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  globalLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload ?? null;
    },
    resetMessage(state) {
      state.message = null;
    },
    setGlobalLoading(state, action) {
      state.globalLoading = !!action.payload;
    },
  },
});

export const { setMessage, resetMessage, setGlobalLoading } = uiSlice.actions;
export default uiSlice.reducer;

