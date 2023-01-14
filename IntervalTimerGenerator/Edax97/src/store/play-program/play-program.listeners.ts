import { AppStateType } from "../app/store";

export const isNotifyListener = (state: AppStateType) =>
  state.playProgram.currentStep?.category === "notify";

export const timeLeftListener = (state: AppStateType) =>
  state.playProgram.timeLeft;

export const loopsLeftListener = (state: AppStateType) =>
  state.playProgram.loopsLeft;

export const isPlayingListener = (state: AppStateType) =>
  state.playProgram.isPlaying;

export const currentPlayProgramListener = (state: AppStateType) =>
  state.playProgram.currentProgram;

export const playingStepIdListener = (state: AppStateType) =>
  state.playProgram.currentStep?.id;

export const timeAccumListener = (state: AppStateType) => {
  return state.playProgram.currentProgram?.stepList.reduce(
    (accum, step) => accum + step.stepTime,
    0
  );
};
