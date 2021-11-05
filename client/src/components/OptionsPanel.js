import "../stylesheets/OptionsPanel.scss"
import { Form, Button, Container } from "react-bulma-components"
import ChannelBox from "./ChannelBox"
import { channelsInfo } from "../seed";

const OptionsPanel = () => {
  //TODO: Use real data from state store
  let channels = channelsInfo.map((ele, index) => <ChannelBox key={index} channel={ele}/> )

  return (
    <div className="OptionsPanel">
      <Form.Control>
        {channels}
        <Container textAlign="center" tablet={{textAlign: "left"}}>
          <Button my={2} color="info" >Get New Playlist</Button>
        </Container>
      </Form.Control>
    </div>
  )
}

export default OptionsPanel
