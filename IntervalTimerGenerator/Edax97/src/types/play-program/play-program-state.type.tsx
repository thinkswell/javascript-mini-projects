import { ProgramType } from "../program/program.type";
import { StepType } from "../program/step.type";

export interface PlayProgramStateType {
  currentStep: StepType | null;
  currentProgram: ProgramType | null;
  timeLeft: number;
  loopsLeft: number;
  isPlaying: boolean;
}
