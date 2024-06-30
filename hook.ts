import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store";
import { ExamActionTypes } from "./actions/type";

type AppDispatch = ThunkDispatch<RootState, void, ExamActionTypes>;

export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
