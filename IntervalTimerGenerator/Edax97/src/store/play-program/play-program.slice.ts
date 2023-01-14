import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayProgramStateType } from "../../types/play-program/play-program-state.type";
import { ProgramType } from "../../types/program/program.type";

const initialState: PlayProgramStateType = {
  currentProgram: null,
  currentStep: null,
  timeLeft: 0,
  loopsLeft: 0,
  isPlaying: false,
};

export const playProgramSlice = createSlice({
  name: "play-program",
  initialState,
  reducers: {
    //getProgramEffect
    setPlayProgramAction: (state, action: PayloadAction<ProgramType>) => {
      state.currentProgram = action.payload;
    },
    //timerEffect
    decTimeAction: (state) => {
      state.timeLeft--;
    },
    decLoopsAction: (state) => {
      state.loopsLeft--;
    },

    //setPlayingStepEffect,
    //nextStepEffect();
    //resetEffect()
    setPlayingStepAction: (state, action: PayloadAction<number>) => {
      const stepId = action.payload;
      const currentStep = state.currentProgram?.stepList.find(
        (step) => step.id === stepId
      );
      state.currentStep = currentStep || null;
      state.timeLeft = currentStep?.stepTime || 0;
    },
    resetAction: (state) => {
      state.loopsLeft = state.currentProgram?.loops || 0;
    },

    //playEffect
    playAction: (state) => {
      state.isPlaying = true;
    },
    pauseAction: (state) => {
      state.isPlaying = false;
    },
  },
});

export const playProgramReducer = playProgramSlice.reducer;
