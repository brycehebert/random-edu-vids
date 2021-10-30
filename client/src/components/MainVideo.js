import "../stylesheets/MainVideo.css"
import YouTube from "react-youtube";

const MainVideo = () => {
  const YTOptions = {
    
  }
  
  return (
    <div className="MainVideo">
      <YouTube videoId="thOifuHs6eY" opts={YTOptions} className="youtube-player">

      </YouTube>
    </div>
  )
}

export default MainVideo
