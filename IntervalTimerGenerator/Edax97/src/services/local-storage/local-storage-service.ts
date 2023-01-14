import { ProgramListState } from "../../types/program-list/program-list-state.type";

export const loadState = (item: string) => {
  try {
    const serializedState = localStorage.getItem(item);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (item: string, state: ProgramListState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(item, serializedState);
  } catch (err) {
    console.log("WRITING ERROR:", err);
    // ignore write errors
  }
};
