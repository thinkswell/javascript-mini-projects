import { StepType } from "./step.type";

export interface ProgramType {
  id: number;
  programName: string;
  stepList: StepType[];
  loops: number;
  setId: number;
}
