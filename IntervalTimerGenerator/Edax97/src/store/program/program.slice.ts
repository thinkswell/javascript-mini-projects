import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setItemProp, uniqueId } from "../../services/utils/id-utils";
import { ProgramStateType } from "../../types/program/program-state.type";
import { ProgramType } from "../../types/program/program.type";
import { StepType } from "../../types/program/step.type";

const initialStep: StepType = {
  id: -1,
  stepName: "",
  stepTime: 60,
  category: "normal",
};
const initialNotifier: StepType = {
  id: -1,
  stepName: "",
  stepTime: 10,
  category: "notify",
};

const initialState: ProgramStateType = {
  currentProgram: {
    id: -1,
    setId: -1,
    programName: "",
    loops: 1,
    stepList: [],
  },
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    resetProgramAction: (state) => {
      return initialState;
    },
    setProgramAction: (state, action: PayloadAction<ProgramType>) => {
      const currentProgram = action.payload;
      state.currentProgram = currentProgram;
    },
    setSetIdAction: (state, action: PayloadAction<number>) => {
      const setId = action.payload;
      state.currentProgram.setId = setId;
    },
    setProgramNameAction: (state, action: PayloadAction<string>) => {
      const programName = action.payload;
      state.currentProgram.programName = programName;
    },
    setLoopsAction: (state, action: PayloadAction<number>) => {
      const loops = action.payload;
      if (loops > 0) state.currentProgram.loops = loops;
    },
    setStepNameAction: (
      state,
      action: PayloadAction<{ stepId: number; stepName: string }>
    ) => {
      const { stepId, stepName } = action.payload;
      setItemProp(state.currentProgram.stepList, stepId, "stepName", stepName);
    },
    setStepTimeAction: (
      state,
      action: PayloadAction<{ stepId: number; stepTime: number }>
    ) => {
      const { stepId, stepTime } = action.payload;
      setItemProp(state.currentProgram.stepList, stepId, "stepTime", stepTime);
    },
    addStepAction: (state) => {
      const stepList = state.currentProgram.stepList;
      stepList.push({ ...initialStep, id: uniqueId(stepList) });
    },
    addNotifierAction: (state) => {
      const stepList = state.currentProgram.stepList;
      stepList.push({ ...initialNotifier, id: uniqueId(stepList) });
    },
    removeStepAction: (state, action: PayloadAction<number>) => {
      const stepId = action.payload;
      state.currentProgram.stepList = state.currentProgram.stepList.filter(
        (step) => step.id !== stepId
      );
    },
  },
});

export const programReducer = programSlice.reducer;
export const programName = programSlice.name;
