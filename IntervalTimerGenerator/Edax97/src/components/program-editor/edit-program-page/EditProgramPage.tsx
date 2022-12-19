import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import {
  removeProgramAction,
  setCurrentSetAction,
} from "../../../store/program-list/program-list.actions";
import { setListListener } from "../../../store/program-list/program-list.listeners";
import {
  getProgramEffect,
  saveProgramEffect,
} from "../../../store/program/program.effects";
import { useCurrentProgram } from "../hooks/use-current-program";
import { ProgramEditorComponent } from "../program-editor-component/ProgramEditorComponent";

export function EditProgramPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  //On mount
  useEffect(() => {
    const { setId, programId } = params;
    if (setId && programId) dispatch(getProgramEffect(+setId, +programId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { program, setProgramName, setLoops } = useCurrentProgram();

  const saveProgram = () => {
    dispatch(saveProgramEffect(program.setId, program.id));
    //Ir al grupo del programa
    dispatch(setCurrentSetAction(program.setId));
    navigate(`/play-program/${program.setId}/${program.id}`);
  };
  const deleteProgram = () => {
    dispatch(
      removeProgramAction({ setId: program.setId, programId: program.id })
    );
    //Ir a home
    navigate("/programs");
  };

  const setList = useAppSelector(setListListener);
  const currentSet = useMemo(
    () => setList.find((set) => set.id === program.setId),
    [program, setList]
  );

  return (
    <div className="pt-1">
      <div className="text-center">
        <span className="badge bg-opacity-75 bg-dark me-2">Group</span>
        <span className="fs-6 fw-bold">{currentSet?.setName}</span>
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
