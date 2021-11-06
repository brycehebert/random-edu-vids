import {createSlice} from "@reduxjs/toolkit";

const initialState = "";

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    videoEnded(state, action) {
      state.push(action.payload);
    }
  }
});

export const {videoEnded} = videoSlice.actions;

export default videoSlice.reducer;