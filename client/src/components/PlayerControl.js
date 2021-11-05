import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import "../stylesheets/PlayerControl.scss"

const PlayerControl = () => {
  return (
    <div className="PlayerControl">
      <SkipPreviousIcon fontSize="large" className="mr-2" />
      <SkipNextIcon fontSize="large" className="mx-2" />
      <ShuffleIcon fontSize="large" className="ml-2" />
    </div>
  );
};

export default PlayerControl;
