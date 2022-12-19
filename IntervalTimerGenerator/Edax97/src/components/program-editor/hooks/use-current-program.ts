import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import {
  setProgramNameAction,
  setLoopsAction,
} from "../../../store/program/program.actions";
import { currentProgramListener } from "../../../store/program/program.listeners";

export function useCurrentProgram() {
  const dispatch = useAppDispatch();

  const program = useAppSelector(currentProgramListener);
  //const {programName, loops, setId} = program;
  const setProgramName = (programName: string) => {
    dispatch(setProgramNameAction(programName));
  };
  const setLoops = (loops: number) => {
    dispatch(setLoopsAction(loops));
  };

  return { program, setProgramName, setLoops };
}
