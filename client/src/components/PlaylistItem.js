import { Media, Image, Heading, Container } from "react-bulma-components";
import "../stylesheets/PlaylistItem.scss";

const PlaylistItem = ({video}) => {
  return (
    <div className="PlaylistItem mx-1">
      <Media>
        <Media.Item align="left">
          <Image src={video.thumbnails.medium.url} size="16by9" alt={video.title} style={{ width: "160px" }} />
        </Media.Item>
      </Media>
      <Container className="truncate">
        <Heading title={video.title} className="playlist-video-title" size={6} weight="light" textAlign="left">
          {video.title}
        </Heading>
        <Heading size={6} subtitle className="playlist-video-channel" weight="default" textAlign="left" mb={2}>
          {video.channelTitle}
        </Heading>
      </Container>
    </div>
  );
};

export default PlaylistItem;
