import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import "../stylesheets/PlayerControl.scss"
import { useDispatch } from "react-redux";
import { nextVideoPressed, prevButtonPressed } from "../reducers/playlistSlice";

const PlayerControl = () => {
  let dispatch = useDispatch();
  
  const onNextButton = () => {
    dispatch(nextVideoPressed());
  }

  const onPrevButton = () => {
    dispatch(prevButtonPressed())
  }

  return (
    <div className="PlayerControl">
      <SkipPreviousIcon fontSize="large" className="mr-2" onClick={onPrevButton} />
      <SkipNextIcon fontSize="large" className="mx-2" onClick={onNextButton} />
      <ShuffleIcon fontSize="large" className="ml-2" />
    </div>
  );
};

export default PlayerControl;
