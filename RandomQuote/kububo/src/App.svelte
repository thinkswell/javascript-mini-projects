<script>
	import Quote from './Quote.svelte';
	import BottomBar from './BottomBar.svelte';

	let currentQuote = {};
	let loading = false;
	let tags;
	const API_URL = 'http://api.quotable.io/random';

	const fetchData = async () => {
		loading = true;
		const full_url = (tags) ? `${API_URL}?tags=${tags}` : API_URL;
		const request = await fetch(full_url);
		const data = await request.json();
		loading = false;
		return await data;
	};

	const newQuote = async () => {
		clearTimeout(timeout);
		currentQuote = await fetchData();
		timeout = setTimeout(newQuote, 5 * 60 * 1000);
	}
	let timeout = setTimeout(newQuote, 5 * 60 * 1000);

	newQuote();
</script>

<div class="app">
	<div class="main">
		<Quote data={currentQuote} />
	</div>
	<BottomBar loading={loading} newQuote={newQuote} bind:tags={tags}/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
	}
	.main {
		display: flex;
		flex-grow: 1;
	}
</style>