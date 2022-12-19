import { StepType } from "./step.type";

export interface NewProgramType {
  programName: string;
  stepList: StepType[];
  loops: number;
  setId: number;
}
