import { ProgramType } from "../program/program.type";

export interface ProgramSetType {
  id: number;
  setName: string;
  programList: ProgramType[];
}
