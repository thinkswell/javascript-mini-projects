import { programSlice } from "./program.slice";

export const {
  resetProgramAction,
  setProgramAction,
  setProgramNameAction,
  setLoopsAction,
  setStepNameAction,
  setStepTimeAction,
  setSetIdAction,
  addStepAction,
  addNotifierAction,
  removeStepAction,
} = programSlice.actions;
