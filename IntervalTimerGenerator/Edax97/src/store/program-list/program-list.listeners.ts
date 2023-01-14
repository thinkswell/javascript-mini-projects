import { AppStateType } from "../app/store";

export const setListListener = (state: AppStateType) =>
  state.programList.setList;
export const currentSetIdListener = (state: AppStateType) =>
  state.programList.currentSetId;
export const currentSetListener = (state: AppStateType) => {
  if (state.programList.setList.length === 0) return null;
  return (
    state.programList.setList.find(
      (set) => set.id === state.programList.currentSetId
    ) || null
  );
};
