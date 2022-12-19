import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { playProgramReducer } from "../play-program/play-program.slice";
import { programListReducer } from "../program-list/program-list.slice";
import { programReducer } from "../program/program.slice";

export const store = configureStore({
  reducer: {
    program: programReducer,
    programList: programListReducer,
    playProgram: playProgramReducer,
  },
});

export type AppDispatchType = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  Action<any>
>;
