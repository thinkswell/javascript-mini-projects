import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProgramListState } from "../../types/program-list/program-list-state.type";
import { ProgramSetType } from "../../types/program-list/program-set.type";
import { ProgramType } from "../../types/program/program.type";
import { uniqueId } from "../../services/utils/id-utils";

const initialState: ProgramListState = {
  currentSetId: null,
  setList: [],
};

export const programListSlice = createSlice({
  name: "programList",
  initialState,
  reducers: {
    setSetListAction: (state, setList: PayloadAction<ProgramSetType[]>) => {
      state.setList = setList.payload;
    },

    //Set actions
    setCurrentSetAction: (state, action: PayloadAction<number>) => {
      const setId = action.payload;
      state.currentSetId = setId;
    },
    newSetAction: (state, action: PayloadAction<string>) => {
      const setName = action.payload;
      state.setList.push({
        id: uniqueId(state.setList),
        setName,
        programList: [],
      });
    },
    editSetNameAction: (
      state,
      action: PayloadAction<{ setId: number; setName: string }>
    ) => {
      const { setName, setId } = action.payload;
      state.setList.forEach((set) => {
        if (set.id === setId) set.setName = setName;
      });
    },
    removeSetAction: (state, action: PayloadAction<number>) => {
      const setId = action.payload;
      if (state.setList.length <= 1) return state;
      state.setList = state.setList.filter((set) => set.id !== setId);
      state.currentSetId = state.setList[0].id;
    },

    //Program actions
    newProgramAction: (
      state,
      action: PayloadAction<{ program: ProgramType; setId: number }>
    ) => {
      const { program, setId } = action.payload;

      state.setList = state.setList.map((set) => {
        if (setId === set.id) {
          set.programList.push({ ...program, id: uniqueId(set.programList) });
        }
        return set;
      });
    },
    editProgramAction: (
      state,
      action: PayloadAction<{
        programUpdated: ProgramType;
        setId: number;
        programId: number;
      }>
    ) => {
      const { programUpdated, setId, programId } = action.payload;
      state.setList = state.setList.map((set) => {
        if (setId === set.id) {
          set.programList = set.programList.map((program) =>
            program.id === programId ? programUpdated : program
          );
        }
        return set;
      });
    },
    removeProgramAction: (
      state,
      action: PayloadAction<{ setId: number; programId: number }>
    ) => {
      const { setId, programId } = action.payload;

      state.setList = state.setList.map((set) => {
        if (setId === set.id) {
          set.programList = set.programList.filter((p) => p.id !== programId);
        }
        return set;
      });
    },
  },
});

export const programListReducer = programListSlice.reducer;
export const programListName = programListSlice.name;
