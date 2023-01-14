import React, { useMemo } from "react";
import { MdAddCircle as MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { removeProgramAction } from "../../../store/program-list/program-list.actions";
import { currentSetListener } from "../../../store/program-list/program-list.listeners";
import { ProgramItemComponent } from "../program-item-component/ProgramItemComponent";

import "./program-list-container.scss";

export function ProgramListContainer() {
  const dispatch = useAppDispatch();
  const currentSet = useAppSelector(currentSetListener);
  const programList = useMemo(() => currentSet?.programList, [currentSet]);

  const onRemoveProgram = (programId: number) => {
    dispatch(removeProgramAction({ setId: currentSet?.id || 0, programId }));
  };

  if (!currentSet) return null;
  return (
    <div>
      {programList?.map((program) => (
        <div className="mb-2" key={program.id}>
          <ProgramItemComponent
            programId={program.id}
            programName={program.programName}
            setId={currentSet.id}
            onRemoveProgram={onRemoveProgram}
          />
        </div>
      ))}
      <Link to="/new-program/">
        <MdAdd className="xl-icon mt-4" />
      </Link>
    </div>
  );
}
