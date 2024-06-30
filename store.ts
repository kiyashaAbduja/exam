import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import examReducer from "./reducers/ExamReducers";

const rootReducer = combineReducers({
  exam: examReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
