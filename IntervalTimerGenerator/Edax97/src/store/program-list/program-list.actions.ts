import { programListSlice } from "./program-list.slice";

export const {
  setSetListAction,
  setCurrentSetAction,
  newSetAction,
  editSetNameAction,
  removeSetAction,
  newProgramAction,
  editProgramAction,
  removeProgramAction,
} = programListSlice.actions;
