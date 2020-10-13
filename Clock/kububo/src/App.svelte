<script>
	import Analog from './Analog.svelte';
import Digital from './Digital.svelte';
import Stopwatch from './Stopwatch.svelte';

	let analog = false;
	let stopwatch = false;
	let runningStopwatch = false;
	let startStopwatch;
	let stopStopwatch;

	let stopwatchTime = {
		h: 0,
		m: 0,
		s: 0
	};
</script>

<div class='d-flex justify-content-center py-2'>
	{#if !analog}
		{#if !stopwatch}
			<button class='btn btn-primary mx-2' on:click={() => analog=true}>Show analog clock</button>
			<button class='btn btn-secondary mx-2' on:click={() => stopwatch=true}>Stopwatch</button>
		{:else}
			<button class='btn btn-secondary' on:click={() => stopwatch=false}>Clock</button>
			<div class="input d-flex mx-4">
				{#if !runningStopwatch}
					<button class="btn btn-success mx-2" on:click={() => {startStopwatch(); runningStopwatch=true;}}>Start stopwatch</button>
				{:else}
					<button class="btn btn-danger mx-2" on:click={() => {stopStopwatch(); runningStopwatch=false;}}>Stop stopwatch</button>
				{/if}
			</div>
		{/if}
	{:else}
		<button class='btn btn-primary' on:click={() => analog=false}>Show digital clock</button>
	{/if}
</div>
<div class='d-flex flex-column justify-content-center align-items-center flex-grow-1'>
	{#if analog}
		<Analog />
	{:else}
		{#if !stopwatch}
			<Digital />
		{:else}
			<Stopwatch bind:start={startStopwatch} bind:stop={stopStopwatch} />
		{/if}
	{/if}
</div>