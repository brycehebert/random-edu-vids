import { configureStore } from "@reduxjs/toolkit"
import playlistReducer from "./reducers/playlistSlice"
import videoReducer from "./reducers/videoSlice"

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    video: videoReducer
  }
})

export default store;