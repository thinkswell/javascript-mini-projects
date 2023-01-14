import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/app/hooks";
import { pauseAction } from "../../../../store/play-program/play-program.actions";
import {
  playEffect,
  resetEffect,
} from "../../../../store/play-program/play-program.effects";
import { isPlayingListener } from "../../../../store/play-program/play-program.listeners";
import { ControlsComponent } from "../controls-component/ControlsComponent";

export function ControlsContainer() {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(isPlayingListener);

  const onStop = () => {
    dispatch(resetEffect());
  };

  const onPlayPause = () => {
    if (isPlaying) dispatch(pauseAction());
    else dispatch(playEffect());
  };

  return (
    <ControlsComponent
      isPlaying={isPlaying}
      onStop={onStop}
      onPlayPause={onPlayPause}
    />
  );
}
