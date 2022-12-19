import { AppThunkType } from "../app/store";
import {
  decLoopsAction,
  decTimeAction,
  playAction,
  setPlayingStepAction,
  setPlayProgramAction,
  pauseAction,
  resetAction,
} from "./play-program.actions";

const interval = 1000;

export const getPlayProgramEffect = (
  setId: number,
  programId: number
): AppThunkType<any> => {
  return (dispatch, getState) => {
    const state = getState();
    const currentSet = state.programList.setList.find(
      (set) => set.id === setId
    );
    const currentProgram = currentSet?.programList.find(
      (program) => program.id === programId
    );
    if (currentProgram) {
      dispatch(setPlayProgramAction(currentProgram));
      dispatch(resetEffect());
    }
  };
};

export const timerEffect = (): AppThunkType<any> => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const { isPlaying, timeLeft, currentProgram, currentStep, loopsLeft } =
        getState().playProgram;

      if (!isPlaying) return;
      dispatch(timerEffect());

      if (timeLeft >= 1) {
        dispatch(decTimeAction());
      } else {
        //lastStep
        const lastStep = currentProgram?.stepList?.slice(-1)[0];
        const isLastStep =
          currentStep && lastStep && currentStep.id === lastStep.id;

        console.log("Last Step", isLastStep);
        if (!isLastStep) {
          dispatch(nextStepEffect());
          return;
        }
        //start next loop
        dispatch(decLoopsAction());
        console.log("Dec Loops");
        //last loop
        if (loopsLeft <= 1) {
          dispatch(resetEffect());
          return;
        }
        const firstStep = currentProgram?.stepList[0];
        if (firstStep) dispatch(setPlayingStepAction(firstStep.id));
      }
    }, interval);
  };
};

//setPlayingStep(id), playEffect()
export const setPlayingStepEffect = (id: number): AppThunkType<any> => {
  return (dispatch, getState) => {
    dispatch(setPlayingStepAction(id));
    dispatch(playEffect());
  };
};

//setPlayingStep(nextId)
export const nextStepEffect = (): AppThunkType<any> => {
  return (dispatch, getState) => {
    const stepId = getState().playProgram.currentStep?.id;
    const currentProgram = getState().playProgram.currentProgram;
    const nextStep = currentProgram?.stepList.find(
      (step) => step.id > (stepId || 0)
    );
    if (nextStep) dispatch(setPlayingStepAction(nextStep.id));
  };
};

//setPlayingStep(start); stopAction()
export const resetEffect = (): AppThunkType<any> => {
  return (dispatch, getState) => {
    //get first step
    const currentProgram = getState().playProgram.currentProgram;
    const firstStep = currentProgram?.stepList[0];
    if (!firstStep) return;
    dispatch(setPlayingStepAction(firstStep.id));
    dispatch(pauseAction());
    dispatch(resetAction());
  };
};

export const playEffect = (): AppThunkType<any> => {
  return (dispatch, getState) => {
    const isPlaying = getState().playProgram.isPlaying;
    if (isPlaying) return;
    //start timer
    dispatch(playAction());
    dispatch(timerEffect());
  };
};
