import "../stylesheets/OptionsPanel.scss";
import { Form, Button, Container } from "react-bulma-components";
import ChannelBox from "./ChannelBox";
import channelsInfo from "../channels";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCustomPlaylist } from "../reducers/playlistSlice";

const OptionsPanel = () => {
  let dispatch = useDispatch();
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

  const handleGetPlaylist = () => {
    if (selected.length === 0) {
      console.log("Must select at least one channel");
      return;
    }

    let payload = selected.join(" ");
    dispatch(getCustomPlaylist(payload));
  };

  let channels = channelsInfo.map((ele, index) => (
    <ChannelBox key={index} channel={ele} handleClick={handleCheckbox} />
  ));

  return (
    <div className="OptionsPanel">
      <Form.Control>
        {channels}
        <Container textAlign="center" tablet={{ textAlign: "left" }}>
          <Button my={2} color="info" onClick={handleGetPlaylist}>
            Get New Playlist
          </Button>
        </Container>
      </Form.Control>
    </div>
  );
};

export default OptionsPanel;
