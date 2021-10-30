import "../stylesheets/Playlist.css"
import { Columns, Container } from "react-bulma-components"

const Playlist = () => {
  return (
    <div className="Playlist">
      <Container breakpoint="widescreen">
        <Columns>
          <Columns.Column>
            Test
          </Columns.Column>
        </Columns>
      </Container>
      
    </div>
  )
}

export default Playlist
