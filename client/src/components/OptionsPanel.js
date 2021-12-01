import "../stylesheets/OptionsPanel.scss";
import { Form, Button, Container } from "react-bulma-components";
import ChannelBox from "./ChannelBox";
import channelsInfo from "../channels";
import { useState } from "react";

const OptionsPanel = () => {
  const [selected, setSelected] = useState(channelsInfo.map((ele) => ele.id));

  const handleCheckbox = (e) => {
    let newSelected = [...selected];
    let value = e.target.value;
    let channelIndex = newSelected.findIndex((ele) => ele === value);

    if (e.target.checked) {
      if (channelIndex === -1) {
        newSelected.push(value);
      }
    } else {
      if (channelIndex !== -1) {
        newSelected.splice(channelIndex, 1);
      }
    }
    setSelected(newSelected);
  };

  let channels = channelsInfo.map((ele, index) => (
    <ChannelBox key={index} channel={ele} handleClick={handleCheckbox} />
  ));

  return (
    <div className="OptionsPanel">
      <Form.Control>
        {channels}
        <Container textAlign="center" tablet={{ textAlign: "left" }}>
          <Button my={2} color="info">
            Get New Playlist
          </Button>
        </Container>
      </Form.Control>
    </div>
  );
};

export default OptionsPanel;
