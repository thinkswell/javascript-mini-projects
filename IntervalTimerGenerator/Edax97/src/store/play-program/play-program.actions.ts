import { playProgramSlice } from "./play-program.slice";

export const {
  setPlayProgramAction,
  decTimeAction,
  decLoopsAction,
  setPlayingStepAction,
  resetAction,
  playAction,
  pauseAction,
} = playProgramSlice.actions;
