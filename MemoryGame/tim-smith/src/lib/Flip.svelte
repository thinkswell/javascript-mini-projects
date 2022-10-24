<script>
  export let flip = false;
  export let height;
  export let width;
</script>

<div class="flip-card" style="width: {width}; height: {height};">
  <div class:flip class="flip-card-inner">
    <div class="flip-card-front">
      <slot name="front" />
    </div>
    <div class="flip-card-back">
      <slot name="back" />
    </div>
  </div>
</div>

<style>
  .flip-card {
    background-color: transparent;
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip {
    transform: rotateY(-180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    overflow: hidden;
  }

  /* Default is facing away */
  .flip-card-back {
    transform: rotateY(180deg);
  }
</style>
