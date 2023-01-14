import React from "react";
import { stepStyles } from "../../../../services/step-style/step-style";
import { useAppDispatch, useAppSelector } from "../../../../store/app/hooks";
import {
  addNotifierAction,
  addStepAction,
  removeStepAction,
  setStepNameAction,
  setStepTimeAction,
} from "../../../../store/program/program.actions";
import { currentProgramListener } from "../../../../store/program/program.listeners";
import { StepType } from "../../../../types/program/step.type";
import { StepEditorComponent } from "../step-editor-component/StepEditorComponent";

export function StepListEditorContainer() {
  const program = useAppSelector(currentProgramListener);
  const dispatch = useAppDispatch();

  //Step add and remove
  const addStep = () => {
    dispatch(addStepAction());
  };
  const addNotifier = () => {
    dispatch(addNotifierAction());
  };
  const removeStep = (stepId: number) => {
    dispatch(removeStepAction(stepId));
  };

  //Step Administration
  const setStepName = (stepId: number, stepName: string) => {
    dispatch(setStepNameAction({ stepId, stepName }));
  };

  const onDecrement = (
    stepId: number,
    stepTime: number,
    changeValue: number
  ) => {
    if (stepTime > changeValue)
      dispatch(setStepTimeAction({ stepId, stepTime: stepTime - changeValue }));
  };
  const onIncrement = (
    stepId: number,
    stepTime: number,
    changeValue: number
  ) => {
    if (stepTime < changeValue * 60)
      dispatch(setStepTimeAction({ stepId, stepTime: stepTime + changeValue }));
  };

  return (
    <>
      <div className="step-list pt-2">
        {program.stepList.map((step: StepType) => (
          <div className="pt-2" key={step.id}>
            <StepEditorComponent
              stepId={step.id}
              stepName={step.stepName}
              category={step.category}
              stepTime={step.stepTime}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
              onRemove={removeStep}
              onSetStepName={setStepName}
            />
          </div>
        ))}
      </div>
      <div className="list-actions d-flex justify-content-center pt-3">
        <button
          className="me-3 btn text-white"
          type="button"
          style={{ backgroundColor: stepStyles.normal }}
          onClick={addStep}
        >
          ADD STEP
        </button>
        <button
          className="btn text-white"
          type="button"
          style={{ backgroundColor: stepStyles.notify }}
          onClick={addNotifier}
        >
          ADD NOTIFIER
        </button>
      </div>
    </>
  );
}
