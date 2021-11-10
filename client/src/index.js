import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import 'bulma/css/bulma.min.css';
import App from "./components/App";

import store from "./store";
import { getPlaylist } from "./reducers/playlistSlice";

store.dispatch(getPlaylist())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"));
