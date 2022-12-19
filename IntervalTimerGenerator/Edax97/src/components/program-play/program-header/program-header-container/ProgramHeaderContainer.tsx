import React, { useMemo } from "react";
import { toMMSS } from "../../../../services/utils/time-utils";
import { useAppSelector } from "../../../../store/app/hooks";
import {
  currentPlayProgramListener,
  loopsLeftListener,
  timeAccumListener,
} from "../../../../store/play-program/play-program.listeners";
import { ProgramHeaderComponent } from "../program-header-component/ProgramHeaderComponent";

export function ProgramHeaderContainer() {
  const currentProgram = useAppSelector(currentPlayProgramListener);
  const loopsLeft = useAppSelector(loopsLeftListener);
  const timeTotal = useAppSelector(timeAccumListener) || 0;
  const [hoursTotal, minutesTotal] = useMemo(
    () => toMMSS(timeTotal),
    [timeTotal]
  );
  if (!currentProgram) return null;

  return (
    <ProgramHeaderComponent
      programName={currentProgram.programName}
      loops={loopsLeft}
      hours={hoursTotal}
      minutes={minutesTotal}
    />
  );
}
