import { ProgramType } from "./program.type";
import { StepType } from "./step.type";

export interface ProgramEditorType {
  state: {
    programName: string;
    stepList: StepType[];
    loops: number;
    programId: number | null;
  };
  actions: {
    setProgramName: React.Dispatch<React.SetStateAction<string>>;
    addStep: (category: "normal" | "notify") => void;
    removeStep: (stepId: number) => void;
    setStepName: (stepId: number, stepName: string) => void;
    setStepTime: (stepId: number, stepTime: number) => void;
    setLoops: React.Dispatch<React.SetStateAction<number>>;
    loadProgram: (program: ProgramType) => void;
  };
}
