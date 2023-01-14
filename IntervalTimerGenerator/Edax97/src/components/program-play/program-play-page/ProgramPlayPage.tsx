/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toMMSS } from "../../../services/utils/time-utils";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import {
  getPlayProgramEffect,
  resetEffect,
} from "../../../store/play-program/play-program.effects";
import { timeLeftListener } from "../../../store/play-program/play-program.listeners";
import { BeepComponent } from "../beep-component/BeepComponent";
import { ControlsContainer } from "../controls/controls-container/ControlsContainer";
import { ProgramHeaderContainer } from "../program-header/program-header-container/ProgramHeaderContainer";
import { StepListContainer } from "../step-list/step-list-container/StepListContainer";
import { TimeDisplayComponent } from "../time-display-component/TimeDisplayComponent";

export function ProgramPlayPage() {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const { setId, programId } = params;
    console.log("SetId", setId, "programId", programId);
    if (setId && programId) dispatch(getPlayProgramEffect(+setId, +programId));

    return () => {
      dispatch(resetEffect());
    };
  }, []);

  const timeLeft = useAppSelector(timeLeftListener);
  const [hoursLeft, minutesLeft] = useMemo(() => toMMSS(timeLeft), [timeLeft]);

  return (
    <div className="p-2">
      <ProgramHeaderContainer />
      <div className="mt-3">
        <StepListContainer />
      </div>
      <div className="mt-5">
        <TimeDisplayComponent hours={hoursLeft} minutes={minutesLeft} />
      </div>
      <div className="mt-3">
        <ControlsContainer />
      </div>
      <BeepComponent />
    </div>
  );
}
