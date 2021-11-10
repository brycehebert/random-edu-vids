import "../stylesheets/App.scss";
import MainVideo from "./MainVideo";
import Playlist from "./Playlist";
import PlayerControl from "./PlayerControl";
import OptionsPanel from "./OptionsPanel";
import { Container, Columns } from "react-bulma-components";
import { useSelector } from "react-redux";

const App = () => {
  let loadingStatus = useSelector((state) => state.playlist.status);

  if (loadingStatus === "loading") return <></>;
  return (
    <div className="App">
      <Container breakpoint="widescreen" mt="1">
        <MainVideo />
      </Container>
      <Container breakpoint="widescreen" my="3">
        <Playlist />
      </Container>
      <Container breakpoint="widescreen" mt="3">
        <Columns breakpoint="tablet" marginless>
          <Columns.Column textAlign="center" tablet={{ textAlign: "left" }} paddingless>
            <PlayerControl />
          </Columns.Column>
          <Columns.Column textAlign="center" tablet={{ textAlign: "right" }} paddingless>
            <OptionsPanel />
          </Columns.Column>
        </Columns>
      </Container>
    </div>
  );
};

export default App;
