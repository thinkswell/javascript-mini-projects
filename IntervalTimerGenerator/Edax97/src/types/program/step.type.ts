export interface StepType {
  id: number;
  stepName: string;
  stepTime: number;
  category: "normal" | "notify";
}
