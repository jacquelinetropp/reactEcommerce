import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReduce from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReduce, applyMiddleware(...middlewares));

export default store;
