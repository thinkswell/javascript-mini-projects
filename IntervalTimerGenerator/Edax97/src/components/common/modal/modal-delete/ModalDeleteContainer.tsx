import React from "react";
import { useModalData } from "../../../../services/modal-data-service/use-modal-data";
import { ModalDelete } from "./ModalDelete";

export function ModalDeleteContainer() {
  const { modalData } = useModalData();
  const { modalMessage, modalTitle, modalFunction } = modalData;
  return (
    <ModalDelete
      id="modal-delete"
      modalMessage={modalMessage}
      modalTitle={modalTitle}
      onDelete={modalFunction}
    />
  );
}
