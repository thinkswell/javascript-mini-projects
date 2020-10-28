<script>
  export let props = {};
</script>

<div>
  <label>
    Brush color: 
    <input type="color" bind:value={props.color}>
  </label>
  <label>
    Brush size: 
    <input type="number" bind:value={props.size}>
  </label>
  <button on:click={props.reload}>Refresh canvas</button>
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
  }
  input {
    margin: 0 .3rem;
  }
  input[type=color] {
    padding: 0;
    background-color: transparent;
    border: none;
  }
  input[type=number] {
    width: 7ch;
  }
  label {
    display: flex;
    align-items: center;
  }
</style>