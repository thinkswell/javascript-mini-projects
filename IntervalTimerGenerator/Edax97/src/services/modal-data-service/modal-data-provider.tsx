import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

//modal type
interface ModalDataType {
  modalTitle: string;
  modalMessage: string;
  modalFunction: () => void;
}
export interface ModalContextType {
  modalData: ModalDataType;
  setModalData: Dispatch<SetStateAction<ModalDataType>>;
}

export const ModalDataContext = createContext<ModalContextType | null>(null);

interface PropsType {
  children: ReactNode;
}
export const ModalDataProvider = (props: PropsType) => {
  const [modalData, setModalData] = useState<ModalDataType>({
    modalTitle: "",
    modalMessage: "",
    modalFunction: () => {},
  });

  //Return Provider data={state, setState}
  return (
    <ModalDataContext.Provider value={{ modalData, setModalData }}>
      {props.children}
    </ModalDataContext.Provider>
  );

  //{setState} = useContext() //set modalData
  //{state} = useContext() //consume modalData
};
