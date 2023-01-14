import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/app/hooks";
import { setPlayingStepEffect } from "../../../../store/play-program/play-program.effects";
import {
  currentPlayProgramListener,
  playingStepIdListener,
} from "../../../../store/play-program/play-program.listeners";
import { StepPlayComponent } from "../step-play-component/StepPlayComponent";

export function StepListContainer() {
  const dispatch = useAppDispatch();

  //step list
  const currentProgram = useAppSelector(currentPlayProgramListener);
  const stepList = useMemo(() => currentProgram?.stepList, [currentProgram]);
  const playStep = (stepId: number) => {
    dispatch(setPlayingStepEffect(stepId));
  };
  const playingStepId = useAppSelector(playingStepIdListener);

  return (
    <div>
      {stepList?.map((step) => (
        <StepPlayComponent
          key={step.id}
          stepName={step.stepName}
          stepTime={step.stepTime}
          onStepPlay={() => {
            playStep(step.id);
          }}
          isPlayingStep={step.id === playingStepId}
          category={step.category}
        />
      ))}
    </div>
  );
}
