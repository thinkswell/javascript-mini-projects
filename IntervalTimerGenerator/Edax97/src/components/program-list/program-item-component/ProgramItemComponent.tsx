import React from "react";
import { MdPlayCircle, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { CardItem } from "../../common/card-item/CardItem";
import "./program-item-component.scss";

interface PropsType {
  programName: string;
  programId: number;
  setId: number;
  onRemoveProgram: (programId: number) => void;
}

export function ProgramItemComponent(props: PropsType) {
  return (
    <CardItem
      className="mt-2 bg-secondary"
      onRemove={() => props.onRemoveProgram(props.programId)}
    >
      <div className="d-flex align-items-center pt-3">
        <div className="me-auto fs-6 fw-bold">{props.programName}</div>
        <Link to={`/edit-program/${props.setId}/${props.programId}`}>
          <MdSettings className="fs-2 text-muted" />
        </Link>
        <Link
          className="ms-2"
          to={`/play-program/${props.setId}/${props.programId}`}
        >
          <MdPlayCircle className="fs-2" />
        </Link>
      </div>
    </CardItem>
  );
}
