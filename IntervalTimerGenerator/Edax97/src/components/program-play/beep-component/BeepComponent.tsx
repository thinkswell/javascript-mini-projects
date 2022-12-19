import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../store/app/hooks";
import { isNotifyListener } from "../../../store/play-program/play-program.listeners";

export function BeepComponent() {
  //audio ELement
  const [audioElement, setAudioElement] = useState<HTMLMediaElement | null>(
    null
  );
  useEffect(() => {
    setAudioElement(document.getElementById("beep") as HTMLMediaElement);
  }, []);
  const audioLen = useMemo(
    () => (audioElement ? audioElement.duration : 0),
    [audioElement]
  );

  //interval when isNotify
  const isNotify = useAppSelector(isNotifyListener);
  useEffect(() => {
    if (!isNotify) {
      audioElement?.load();
      return;
    }
    const beepTimer = setInterval(() => {
      if (audioElement) audioElement.play();
    }, audioLen);
    return () => {
      clearInterval(beepTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotify]);

  return (
    <audio
      id="beep"
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    ></audio>
  );
}
