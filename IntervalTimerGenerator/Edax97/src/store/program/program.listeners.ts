import { AppStateType } from "../app/store";

export const currentProgramListener = (state: AppStateType) =>
  state.program.currentProgram;
