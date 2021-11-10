import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const playlistAdapter = createEntityAdapter({
  selectId: (video) => video.resourceId.videoId
});

const initialState = playlistAdapter.getInitialState({
  status: "idle",
  currentPlaying: "",
  prevVideo: "",
  nextVideo: ""
});

export const getPlaylist = createAsyncThunk("playlist/getPlaylist", async () => {
  const response = await axios.get("http://192.168.0.139:3001/api/getPlaylist");
  return response.data;
});

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    nextVideoPressed(state, action) {
      state.prevVideo = state.currentPlaying;
      state.currentPlaying = state.nextVideo;
      if (state.nextVideo === state.ids.slice(-1)[0]) {
        state.nextVideo = state.ids[0];
        return;
      }
      let index = state.ids.findIndex((ele) => ele === state.nextVideo);
      state.nextVideo = state.ids[index + 1];
    },
    prevButtonPressed(state, action) {
      state.nextVideo = state.currentPlaying;
      state.currentPlaying = state.prevVideo;
      if (state.prevVideo === state.ids[0]){
        state.prevVideo = state.ids[state.ids.length - 1];
        return;
      }
      let index = state.ids.findIndex((ele) => ele === state.prevVideo);
      state.prevVideo = state.ids[index - 1];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        playlistAdapter.setAll(state, action.payload);
        state.currentPlaying = state.ids[0];
        state.nextVideo = state.ids[1];
        state.status = "idle";
      });
  }
});

export const {
  selectAll: selectVideos,
  selectById: selectVideoById,
  selectIds: selectVideoIds
} = playlistAdapter.getSelectors((state) => state.playlist);

export const { nextVideoPressed, prevButtonPressed } = playlistSlice.actions;

export default playlistSlice.reducer;
