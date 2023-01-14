import { useContext } from "react";
import { ModalContextType, ModalDataContext } from "./modal-data-provider";

export const useModalData = () =>
  useContext(ModalDataContext) as ModalContextType;
