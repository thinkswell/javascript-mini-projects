<script>
  let interval;
  let currentTime = 0;
  export const start = () => {
    currentTime = 0;
    interval = setInterval(() => {
      currentTime += .1;
    }, 100);
  }
  export const stop = () => {
    clearInterval(interval);
  }
  let message = 'Stopwatch';
  $: {
    const s = currentTime % 60;
    const m = Math.floor((currentTime - s) / 60) % 60;
    const h = Math.floor((currentTime - m * 60 - s) / 3600);

    message = `${h}:${m}:${s.toFixed(1)}`;
  }
</script>

<div>
  {message}
</div>

<style>
  div {
    font-size: 9rem;
    font-weight: 500;
    display: inline-block;
  }
</style>