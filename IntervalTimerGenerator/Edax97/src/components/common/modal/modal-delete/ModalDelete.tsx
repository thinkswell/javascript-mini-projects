import React from "react";
import { ModalWindow } from "../modal-window/ModalWindow";

interface PropsType {
  id: string | undefined;
  modalTitle: string;
  modalMessage: string;
  onDelete: () => void;
}
export function ModalDelete(props: PropsType) {
  return (
    <ModalWindow id={props.id} modalTitle={props.modalTitle}>
      <div>{props.modalMessage}</div>
      <div className="flex mt-3">
        <button data-bs-dismiss="modal" className="btn btn-secondary">
          CANCEL
        </button>
        <button
          data-bs-dismiss="modal"
          className="ms-2 btn btn-danger"
          onClick={() => props.onDelete()}
        >
          DELETE
        </button>
      </div>
    </ModalWindow>
  );
}
