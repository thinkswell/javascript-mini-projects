import { ProgramSetType } from "./program-set.type";

export interface ProgramListState {
  currentSetId: number | null;
  setList: ProgramSetType[];
}
