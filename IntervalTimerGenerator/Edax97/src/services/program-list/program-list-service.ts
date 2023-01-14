import { handleError, handleResponse } from "../api-utils/api-utils";
import { initialProgramList } from "./initial-program-list";
const API_URL = "http://localhost:3001/programs";

export function fetchProgramSets() {
  return fetch(API_URL).then(handleResponse).catch(handleError);
}
export function getInitialProgramList() {
  return initialProgramList;
}
