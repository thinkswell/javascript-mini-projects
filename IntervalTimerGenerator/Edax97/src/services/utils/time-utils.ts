export function toTwoDigits(num: number) {
  if (num < 10) return "0" + num.toString();
  return num.toString();
}

export function toMMSS(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return [toTwoDigits(minutes), toTwoDigits(seconds)];
}
