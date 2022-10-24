<script>
	import Canvas from "./Canvas.svelte";
	import Panel from "./Panel.svelte";
import Settings from "./Settings.svelte";

	let props = {
		width: null,
		height: null,
		color: 'black',
		size: 10
	};
</script>

<div>
	{#if props.width && props.height}
		<Canvas props={props} />
		<Panel bind:props={props} />
	{:else}
		<Settings bind:props={props} />
	{/if}
</div>