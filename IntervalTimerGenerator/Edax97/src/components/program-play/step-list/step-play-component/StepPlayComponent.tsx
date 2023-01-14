import React, { useMemo } from "react";
import { toMMSS } from "../../../../services/utils/time-utils";
import { CardItem } from "../../../common/card-item/CardItem";
import { MdPlayCircle } from "react-icons/md";
import { stepStyles } from "../../../../services/step-style/step-style";
import "./step-play-component.scss";

interface PropsType {
  stepName: string;
  stepTime: number;
  category: "normal" | "notify";
  onStepPlay: () => void;
  isPlayingStep: boolean;
}
export function StepPlayComponent(props: PropsType) {
  const [hours, minutes] = useMemo(
    () => toMMSS(props.stepTime),
    [props.stepTime]
  );

  const stepColor = useMemo(
    () => (props.category === "normal" ? stepStyles.normal : stepStyles.notify),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.category]
  );

  return (
    <CardItem
      className={`mt-2 ${props.isPlayingStep ? "active-item" : ""}`}
      withoutRemove={true}
    >
      <div className="d-flex align-items-center" onClick={props.onStepPlay}>
        <MdPlayCircle
          className="fs-1"
          onClick={props.onStepPlay}
          role="button"
          aria-label={`Play ${props.stepName} step`}
          style={{ color: stepColor }}
        />
        <div className="ms-2">{props.stepName}</div>
        <div className="ms-auto me-2 badge bg-opacity-75 bg-dark">
          {hours}:{minutes}
        </div>
      </div>
    </CardItem>
  );
}
