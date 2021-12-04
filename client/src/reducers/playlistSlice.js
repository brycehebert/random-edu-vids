import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const playlistAdapter = createEntityAdapter({
  selectId: (video) => video.resourceId.videoId
});

const initialState = playlistAdapter.getInitialState({
  status: "idle",
  currentPlaying: "",
  prevVideo: "",
  nextVideo: "",
  firstVideo: "",
  lastVideo: ""
});

export const getPlaylist = createAsyncThunk("playlist/getPlaylist", async () => {
  const response = await axios.get("https://random-edu-vids.herokuapp.com/api/getPlaylist");
  return response.data;
});

export const getCustomPlaylist = createAsyncThunk("playlist/getCustomPlaylist", async (payload) => {
  const response = await axios.get("https://random-edu-vids.herokuapp.com/api/getCustomPlaylist",{
    params: {selectedChannels: payload}
  });
  
  return response.data;
})

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    nextVideoPressed(state, action) {
      state.prevVideo = state.currentPlaying;
      state.currentPlaying = state.nextVideo;
      if (state.nextVideo === state.lastVideo) {
        state.nextVideo = state.firstVideo;
        return;
      }
      let index = state.ids.findIndex((ele) => ele === state.nextVideo);
      state.nextVideo = state.ids[index + 1];
    },
    prevButtonPressed(state, action) {
      state.nextVideo = state.currentPlaying;
      state.currentPlaying = state.prevVideo;
      if (state.prevVideo === state.firstVideo) {
        state.prevVideo = state.lastVideo;
        return;
      }
      let index = state.ids.findIndex((ele) => ele === state.prevVideo);
      state.prevVideo = state.ids[index - 1];
    },
    shuffleButtonPressed(state, action) {
      playlistAdapter.setAll(state, action.payload);
      state.currentPlaying = state.firstVideo = state.ids[0];
      state.nextVideo = state.ids[1];
      state.prevVideo = state.lastVideo = state.ids[state.ids.length - 1];
    },
    playlistItemClicked(state, action) {
      state.currentPlaying = action.payload;
      let index = state.ids.findIndex(ele => ele === action.payload);
      if (index === state.ids.length - 1) {
        state.nextVideo = state.firstVideo
      } else {
        state.nextVideo = state.ids[index + 1];
      }
      if (index === 0) {
        state.prevVideo = state.lastVideo;
      } else {
        state.prevVideo = state.ids[index - 1];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        playlistAdapter.setAll(state, action.payload);
        state.currentPlaying = state.firstVideo = state.ids[0];
        state.nextVideo = state.ids[1];
        state.prevVideo = state.lastVideo = state.ids[state.ids.length - 1];
        state.status = "idle";
      })
      .addCase(getCustomPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCustomPlaylist.fulfilled, (state, action) => {
        playlistAdapter.setAll(state, action.payload);
        state.currentPlaying = state.firstVideo = state.ids[0];
        state.nextVideo = state.ids[1];
        state.prevVideo = state.lastVideo = state.ids[state.ids.length - 1];
        state.status = "idle";
      })
  }
});

export const {
  selectAll: selectVideos,
  selectById: selectVideoById,
  selectIds: selectVideoIds
} = playlistAdapter.getSelectors((state) => state.playlist);

export const { nextVideoPressed, prevButtonPressed, shuffleButtonPressed, playlistItemClicked } = playlistSlice.actions;

export default playlistSlice.reducer;
