<script>
	let options = {
		specialChars: true,
		numbers: true,
		length: 10
	};
	let password = 'Press generate pasword';

	const letters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
	const specialChars = '@#$&*()%_-<>+?!';
	const numbers = '1234567890';

	$: {
		generatePassword()
	}

	const generatePassword = () => {
		const base = `${letters}${(options.specialChars)?specialChars:''}${(options.numbers)?numbers:''}`;
		password = Array.from({length: options.length}).map(letter => {
			const randomCharIndex = Math.floor(Math.random() * base.length - 1);
			return base[randomCharIndex];
		}).join('');
	};
</script>

<div>
	<h1>Random password generator</h1>
	<div>
		<label>Random password: </label>
		<input type="text" value={password} readonly contenteditable>
	</div>
	<div>
		<label>
			<input type="checkbox" bind:checked={options.specialChars}>
			Use special characters
		</label>
		<label>
			<input type="checkbox" bind:checked={options.numbers}>
			Use numbers
		</label>
		<label>
			Password length: 
			<input type="number" bind:value={options.length}>
		</label>
	</div>
	<div>
		<button on:click={generatePassword}>Generate new password</button>
	</div>
</div>

<style>
	label {
		display: block;
	}
	input[type=text], button {
		width: 100%;
	}
	div > div {
		margin: 1.5rem 0;
	}
</style>