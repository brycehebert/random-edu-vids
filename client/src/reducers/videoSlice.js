import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autoplay: 0
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setAutoPlay(state, action) {
      state.autoplay = action.payload;
    }
  }
});

export const { setAutoPlay } = videoSlice.actions;

export default videoSlice.reducer;
