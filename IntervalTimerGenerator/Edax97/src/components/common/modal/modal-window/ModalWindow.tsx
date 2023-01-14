import React, { ReactNode } from "react";

interface PropsType {
  id: string | undefined;
  modalTitle: string;
  children: ReactNode | ReactNode[];
}
export function ModalWindow(props: PropsType) {
  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex={-1}
      aria-labelledby="modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modal-label">
              {props.modalTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
