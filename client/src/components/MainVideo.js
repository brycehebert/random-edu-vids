import "../stylesheets/MainVideo.scss";
import YouTube from "react-youtube";

const MainVideo = ({videos}) => {
  const getRandomVideoId = (vids) => {
    let video = Math.floor(Math.random() * vids.length);
    return vids[video].resourceId.videoId;
  };

  return (
    <div className="MainVideo">
      <YouTube videoId={getRandomVideoId(videos)} className="youtube-player" />
    </div>
  );
};

export default MainVideo;
