import React from "react";
import "./time-display-component.scss";

interface PropsType {
  hours: string;
  minutes: string;
}
export function TimeDisplayComponent(props: PropsType) {
  return (
    <div className="display-3 d-flex justify-content-center">
      <div className="time-display p-1 rounded-4 bg-opacity-75 text-bg-dark text-center">
        {props.hours}:{props.minutes}
      </div>
    </div>
  );
}
