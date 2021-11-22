import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import "../stylesheets/PlayerControl.scss";
import { Form, Container } from "react-bulma-components";
import { useDispatch, useSelector } from "react-redux";
import { setAutoPlay } from "../reducers/videoSlice";
import { nextVideoPressed, prevButtonPressed, selectVideos, shuffleButtonPressed  } from "../reducers/playlistSlice";

//Fisher-Yates shuffle
const shuffle = (array) => {
  const newArray = [...array]

  let i = newArray.length;
  while (--i) {
    let j = Math.floor(Math.random() * (i + 1));
    let tempi = newArray[i];
    let tempj = newArray[j];
    newArray[i] = tempj;
    newArray[j] = tempi;
  }
  return newArray;
};

const PlayerControl = () => {
  let dispatch = useDispatch();
  let videos = useSelector(selectVideos);
  let ap = useSelector(state => state.video.autoplay);

  const onNextButton = () => {
    dispatch(nextVideoPressed());
  };
  const onPrevButton = () => {
    dispatch(prevButtonPressed());
  };
  const onShuffleButton = () => {
    let shuffled = shuffle(videos);
    dispatch(shuffleButtonPressed(shuffled));
  };
  const onAutoPlayClicked = (e) => {
    dispatch(setAutoPlay(e.target.checked ? 1 : 0))
  }
  return (
    <Container className="PlayerControl" display="flex" alignItems="center">
      <SkipPreviousIcon fontSize="large" mr="2" onClick={onPrevButton} />
      <SkipNextIcon fontSize="large" ml="2" onClick={onNextButton} />
      <ShuffleIcon fontSize="large" mx="2" onClick={onShuffleButton} />
      <Form.Checkbox  value="AutoPlay" ml="4" defaultChecked={ap} onChange={onAutoPlayClicked}>AutoPlay</Form.Checkbox>
    </Container>
  );
};

export default PlayerControl;
