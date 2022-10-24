<script>
  export let props = {};
  let canvas;
  let mousedown = false;
  let mouseentered = true;
  let mouseposition = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 1
  };

  $: {
    if(canvas) {
      const ctx = canvas.getContext('2d');
      if(mousedown && mouseentered) {
        ctx.strokeStyle = props.color;
        ctx.lineWidth = props.size;
        ctx.beginPath();
        ctx.moveTo(mouseposition.prevX, mouseposition.prevY);
        ctx.lineTo(mouseposition.x, mouseposition.y);
        ctx.stroke();
      }

      props.reload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
</script>

<canvas
  width={props.width}
  height={props.height}
  bind:this={canvas}
  on:mousedown={ () => { mousedown = true; mouseposition = {prevX: mouseposition.x, prevY: mouseposition.y} } }
  on:mouseup={ () => mousedown = false }
  on:mouseenter={ () => { mouseentered = true; mouseposition = {prevX: null, prevY: null} } }
  on:mouseleave={ () => mouseentered = false }
  on:mousemove={ e => mouseposition = {
    x: e.clientX - e.target.offsetLeft,
    y: e.clientY - e.target.offsetTop,
    prevX: mouseposition.x,
    prevY: mouseposition.y 
  } }
>
  Your browser does not support canvas.
</canvas>

<style>
  canvas {
    border: 1px solid black;
    background-color: white;
  }
</style>