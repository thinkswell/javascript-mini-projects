import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatchType, AppStateType } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
