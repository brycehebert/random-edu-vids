import "../stylesheets/MainVideo.scss";
import YouTube from "react-youtube";
import { useSelector, useDispatch, useStore } from "react-redux";
import { setVideoState } from "../reducers/videoSlice";
import { selectVideoById, nextVideoPressed } from "../reducers/playlistSlice";

const MainVideo = () => {
  const store = useStore();
  const dispatch = useDispatch();
  let currentVideo = useSelector(state => selectVideoById(state, state.playlist.currentPlaying));
  let autoplay = store.getState().video.autoplay //Only need autoplay setting at end of video. So don't use selector (would cause re-render).

  const videoStateChanged = e => {
    dispatch(setVideoState(e.data))
    autoplay = store.getState().video.autoplay
    if (e.data === YouTube.PlayerState.ENDED) {
      dispatch(nextVideoPressed());
    }
  }

  return (
    <div className="MainVideo">
      <YouTube videoId={currentVideo.resourceId.videoId} opts={{playerVars: {autoplay: autoplay}}} onStateChange={videoStateChanged} className="youtube-player" />
    </div>
  );
};

export default MainVideo;
