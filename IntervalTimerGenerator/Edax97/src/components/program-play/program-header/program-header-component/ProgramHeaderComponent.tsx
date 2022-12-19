import React from "react";
import { MdRepeat } from "react-icons/md";

interface PropsType {
  programName: string;
  loops: number;
  hours: string;
  minutes: string;
}

export function ProgramHeaderComponent(props: PropsType) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="fw-bold">{props.programName}</div>
      <div className="ms-4">
        <MdRepeat className="me-2 fs-5" />
        {props.loops}
      </div>
      <div className="ms-4 badge bg-opacity-75 bg-dark">
        {props.hours}:{props.minutes}
      </div>
    </div>
  );
}
