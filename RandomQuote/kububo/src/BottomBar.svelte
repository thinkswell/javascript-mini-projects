<script>
  export let loading;
  export let newQuote;
  export let tags = null;

  const API_URL = 'http://api.quotable.io/tags';
  const getTags = async () => {
    const request = await fetch(API_URL);
    const rawData = await request.json();
    const data = await rawData.map(({name}) => name);
    return data;
  };
</script>

<div class='d-flex justify-content-center py-4'>
  <select class="mx-2" bind:value={tags}>
    <option value={null}>All tags</option>
    {#await getTags()}
      <option value={null}>Loading list of tags...</option>
    {:then tags}
      {#each tags as tag}
        <option value={tag}>{tag}</option>
      {/each}
    {/await}
  </select>
	<button class="btn btn-primary mx-2" on:click={newQuote}>
		{#if loading}
			<span class="spinner-border spinner-border-sm text-white mx-1"></span>
		{/if}
		<span class="my-auto">Show another one</span>
	</button>
</div>