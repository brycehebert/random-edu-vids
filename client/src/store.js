import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducer"

const store = createStore(rootReducer);

export default store;

//example: https://github.com/reduxjs/redux-fundamentals-example-app