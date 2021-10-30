import '../stylesheets/App.css';
import MainVideo from './MainVideo';
import Playlist from './Playlist';
import { Container } from 'react-bulma-components';

const App = () => {
  return (
    <div className="App">
      <Container breakpoint="widescreen" mt="1">
        <MainVideo/>
      </Container>
      <Playlist/>
    </div>
  );
}

export default App;
