class BeepServiceClass {
  audioElement: HTMLMediaElement | null = null;

  beepInit = () => {
    this.audioElement = document.getElementById("beep") as HTMLMediaElement;
  };

  playBeep = () => {
    if (this.audioElement) this.audioElement.play();
  };
  stopBeep = () => {
    console.log("AUDIO", this.audioElement);
    if (this.audioElement) this.audioElement.load();
  };
}

export const beepService = new BeepServiceClass();
