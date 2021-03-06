import { Container, Media, Image, Form, Heading } from "react-bulma-components";
import "../stylesheets/ChannelBox.scss"

const ChannelBox = ({channel, handleClick}) => {
  return (
    <div className="ChannelBox">
      <Container display="flex" alignItems="center" py="2">
        <Form.Checkbox name="channel" value={channel.id} display="inline" defaultChecked={true} onChange={handleClick} m="5" />
        <Media>
          <Media.Item align="left" display="inline-block">
            <Image src={channel.avatarUrl} size={48} rounded  />
          </Media.Item>
        </Media>
        <Heading size={5}>{channel.channelName}</Heading>
      </Container>
    </div>
  );
};

export default ChannelBox;
