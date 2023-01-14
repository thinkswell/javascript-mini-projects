import React, { useEffect, useState } from "react";
import { ModalWindow } from "../modal-window/ModalWindow";

interface PropsType {
  id: string;
  modalTitle: string;
  editLabel: string;
  initialName: string;
  onEdit: (name: string) => void;
  buttonLabel: string;
}

export function ModalEdit(props: PropsType) {
  const [name, setName] = useState("");
  //On boot
  useEffect(() => {
    setName(props.initialName);
  }, [props.initialName]);

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };

  const onEdit = () => {
    if (name.length > 0) props.onEdit(name);
  };

  return (
    <ModalWindow id={props.id} modalTitle={props.modalTitle}>
      <div className="form-floating">
        <input
          className="form-control"
          id="set-name"
          type="text"
          placeholder={props.editLabel}
          value={name}
          onChange={onNameChange}
        />
        <label htmlFor="set-name">{props.editLabel}</label>
      </div>
      <div className="flex mt-3">
        <button data-bs-dismiss="modal" className="btn btn-secondary">
          CANCEL
        </button>
        <button
          data-bs-dismiss="modal"
          className="ms-2 btn btn-warning"
          onClick={onEdit}
        >
          {props.buttonLabel}
        </button>
      </div>
    </ModalWindow>
  );
}
