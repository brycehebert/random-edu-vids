import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autoplay: 0,
  videoState: -1
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setAutoPlay(state, action) {
      state.autoplay = action.payload;
    },
    setVideoState(state, action) {
      state.videoState = action.payload;
    }
  }
});

export const { setAutoPlay, setVideoState } = videoSlice.actions;

export default videoSlice.reducer;
