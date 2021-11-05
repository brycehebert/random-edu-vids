import { useRef, useEffect, useCallback } from "react";
import "../stylesheets/Playlist.scss";
import { Container } from "react-bulma-components";
import PlaylistItem from "./PlaylistItem";

const Playlist = ({videos}) => {
  console.log(videos)
  //TODO: Use real data from state store
  const testArray = videos.map((ele, index) => <PlaylistItem key={index} video={ele} />);
  const playlistRef = useRef(); //Reference to Playlist dom element

  //Make Playlist scroll horizontally with mouse wheel
  const onPlaylistWheel = useCallback((e) => {
    let { scrollLeft, scrollWidth, clientWidth } = playlistRef.current;

    if (scrollLeft >= scrollWidth - clientWidth && e.deltaY > 0) return; //At end of list and trying to scroll more left
    if (scrollLeft === 0 && e.deltaY < 0) return; //At beginning of list and trying to scroll more right

    playlistRef.current.scrollLeft += e.deltaY;
    e.preventDefault(); //Prevents main page from scrolling while scrolling in playlist
  }, []);

  //Assign onwheel to the dom element
  useEffect(() => {
    playlistRef.current.onwheel = onPlaylistWheel;
  }, [onPlaylistWheel]);

  return (
    <div className="Playlist" ref={playlistRef}>
      <Container
        className="playlist-container"
        breakpoint="widescreen"
        display="flex"
        justifyContent="flex-start"
        flexWrap="nowrap"
      >
        {testArray}
      </Container>
    </div>
  );
};

export default Playlist;
