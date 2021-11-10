import "../stylesheets/MainVideo.scss";
import YouTube from "react-youtube";
import { useSelector } from "react-redux";
import { selectVideoById } from "../reducers/playlistSlice";
import { useState } from "react";

const MainVideo = () => {
  let [autoPlay, setAutoPlay] = useState(0)
  let currentVideo = useSelector(state => selectVideoById(state, state.playlist.currentPlaying));

  const videoStateChanged = e => {
    if (e.data === YouTube.PlayerState.ENDED) {

    }
  }

  return (
    <div className="MainVideo">
      <YouTube videoId={currentVideo.resourceId.videoId} opts={{playerVars: {autoplay: autoPlay}}} onStateChange={videoStateChanged} className="youtube-player" />
    </div>
  );
};

export default MainVideo;
