import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/app/hooks";
import {
  editSetNameAction,
  newSetAction,
  removeSetAction,
  setCurrentSetAction,
} from "../../../../store/program-list/program-list.actions";
import {
  currentSetIdListener,
  setListListener,
} from "../../../../store/program-list/program-list.listeners";
import { ModalDelete } from "../../../common/modal/modal-delete/ModalDelete";
import { ModalEdit } from "../../../common/modal/modal-edit/ModalEditt";
import { SetSelectorComponent } from "../set-selector-component/SetSelectorComponent";

interface PropsType {
  hideDelete: boolean;
}

export function SetSelectorContainer(props: PropsType) {
  const dispatch = useAppDispatch();
  const currentSetId = useAppSelector(currentSetIdListener);
  const setList = useAppSelector(setListListener);
  const currentSetName = useMemo(
    () => setList.find((set) => set.id === currentSetId)?.setName || "",
    [currentSetId, setList]
  );

  const selectSet = (setId: number) => {
    dispatch(setCurrentSetAction(setId));
  };
  const deleteSet = (setId: number) => {
    dispatch(removeSetAction(setId));
  };
  const createSet = (setName: string) => {
    dispatch(newSetAction(setName));
  };
  const editSetName = (setId: number, setName: string) => {
    dispatch(editSetNameAction({ setId, setName }));
  };

  const deleteModalId = "delete-modal";
  const createModalId = "create-modal";
  const editModalId = "edit-modal";

  if (currentSetId === null) return null;
  return (
    <div>
      <SetSelectorComponent
        currentSetId={currentSetId}
        setList={setList}
        selectSet={selectSet}
        deleteModalId={deleteModalId}
        createModalId={createModalId}
        editModalId={editModalId}
        hideDelete={props.hideDelete}
      />
      <ModalDelete
        id={deleteModalId}
        modalTitle="Delete group"
        modalMessage={`Do you want to delete: ${currentSetName}?`}
        onDelete={() => deleteSet(currentSetId)}
      />

      <ModalEdit
        id={createModalId}
        modalTitle="Create new group"
        editLabel="Group name"
        initialName=""
        onEdit={createSet}
        buttonLabel="CREATE"
      />
      <ModalEdit
        id={editModalId}
        modalTitle="Edit group name"
        editLabel="Group name"
        initialName={currentSetName}
        onEdit={(setName) => editSetName(currentSetId, setName)}
        buttonLabel="SAVE"
      />
    </div>
  );
}
