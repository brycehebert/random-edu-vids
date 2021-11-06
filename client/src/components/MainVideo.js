import "../stylesheets/MainVideo.scss";
import YouTube from "react-youtube";
import axios from "axios";

const MainVideo = ({videos}) => {
  const getRandomVideoId = (vids) => {
    let video = Math.floor(Math.random() * vids.length);
    return vids[video].resourceId.videoId;
  };

  const videoStateChanged = e => {
    if (e.data === -1){
      axios({
        method: "POST",
        url: "http://localhost:3001/api/getPlaylist",
        data: {
          selectedChannels: ["cgpgrey", "veritasium", "smartereveryday"],
          currentPlaylist: videos
        }
      }).then(res => console.log(res.data) )
    }
  }

  return (
    <div className="MainVideo">
      <YouTube videoId={getRandomVideoId(videos)} onStateChange={videoStateChanged} className="youtube-player" />
    </div>
  );
};

export default MainVideo;
