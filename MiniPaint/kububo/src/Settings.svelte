<script>
  export let props;

  let size = {
    width: 600,
    height: 400
  };

  const createCanvas = () => {
    props.width = size.width;
    props.height = size.height;
  };
</script>

<div>
  <div>
    <label>
      Width: 
      <input type="number" bind:value={size.width}>
      px
    </label>
    <label>
      Height: 
      <input type="number" bind:value={size.height}>
      px
    </label>
  </div>
  <div>
    <button on:click={createCanvas}>Create canvas</button>
  </div>
</div>

<style>
  button {
    margin: .6rem .2rem;  
    display: block;
    width: 100%;
  }
  label {
    margin: 0 .5rem;
  }
</style>