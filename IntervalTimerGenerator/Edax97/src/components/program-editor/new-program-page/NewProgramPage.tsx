/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { setCurrentSetAction } from "../../../store/program-list/program-list.actions";
import {
  currentSetIdListener,
  setListListener,
} from "../../../store/program-list/program-list.listeners";
import {
  resetProgramAction,
  setSetIdAction,
} from "../../../store/program/program.actions";
import { newProgramEffect } from "../../../store/program/program.effects";
import { SetSelectorComponent } from "../../program-list/set-selector/set-selector-component/SetSelectorComponent";
import { useCurrentProgram } from "../hooks/use-current-program";
import { ProgramEditorComponent } from "../program-editor-component/ProgramEditorComponent";

export function NewProgramPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { program, setProgramName, setLoops } = useCurrentProgram();

  const saveProgram = () => {
    dispatch(newProgramEffect(program.setId));
    //Ir al grupo donde se creo el programa
    dispatch(setCurrentSetAction(program.setId));
    navigate("/programs");
  };
  const deleteProgram = () => {
    navigate("/programs");
  };

  const initialSetId = useAppSelector(currentSetIdListener);
  const setList = useAppSelector(setListListener);
  const selectSet = (setId: number) => {
    dispatch(setSetIdAction(setId));
  };

  //Mount
  useEffect(() => {
    dispatch(resetProgramAction());
    if (initialSetId !== null) dispatch(setSetIdAction(initialSetId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-1">
      <div className="w-50 m-auto">
        <SetSelectorComponent
          currentSetId={program.setId}
          setList={setList}
          selectSet={selectSet}
          hideDelete
        />
      </div>
      <div className="pt-3">
        <ProgramEditorComponent
          programName={program.programName}
          loops={program.loops}
          setProgramName={setProgramName}
          setLoops={setLoops}
          saveProgram={saveProgram}
          deleteProgram={deleteProgram}
        />
      </div>
    </div>
  );
}
