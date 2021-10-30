import "../stylesheets/MainVideo.css";
import YouTube from "react-youtube";

const MainVideo = () => {
  return (
    <div className="MainVideo">
      <YouTube videoId="thOifuHs6eY" className="youtube-player" />
    </div>
  );
};

export default MainVideo;
