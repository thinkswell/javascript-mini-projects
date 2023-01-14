import React from "react";
import "./controls-component.scss";
import {
  MdStopCircle as MdStop,
  MdPlayCircle as MdPlay,
  MdPauseCircle as MdPause,
} from "react-icons/md";

interface PropsType {
  isPlaying: boolean;
  onStop: () => void;
  onPlayPause: () => void;
}

export function ControlsComponent(props: PropsType) {
  return (
    <div className="d-flex align-items-center justify-content-center control-rep">
      <div
        className="d-flex align-items-center"
        onClick={props.onPlayPause}
        role="button"
        aria-label="Play-pause timer"
      >
        {props.isPlaying ? <MdPause /> : <MdPlay />}
      </div>
      <MdStop
        className="ms-2"
        onClick={props.onStop}
        role="button"
        aria-label="Reset timer"
      />
    </div>
  );
}
