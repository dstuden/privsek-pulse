<script>
	import "../src/global.css";
	
	let loggedIn = false,
		usr,
		passwd;

	if (localStorage.getItem("validated")) {
		loggedIn = true;
	}

	function logIn() {
		if (usr != "rivsek" || passwd != "12345") {
			return alert("Wrong login info!\nnot privsek maybe????");
		} else {
			loggedIn = true;
			localStorage.setItem("validated", loggedIn);
		}
	}

	function logOut() {
		localStorage.removeItem("validated");
		loggedIn = false;
	}
</script>

<body>
	{#if loggedIn == true}
		<div class="logout">
			<button class="button" on:click={logOut}>Log Out</button>
		</div>
	{/if}
	<section>
		{#if loggedIn == true}
			<h3>Welcome<br />Privsek</h3>
			<input
				type="text"
				class="ammount"
				placeholder="amount"
				maxlength="15"
			/>
			<textarea
				class="note"
				placeholder="note for rivsek"
				maxlength="100"
			/>
			<button class="button"><span>Request</span></button>
		{:else}
			<h3>Welcome</h3>
			<input
				type="text"
				class="ammount"
				placeholder="username"
				maxlength="15"
				bind:value={usr}
			/>
			<input
				type="password"
				class="ammount"
				placeholder="password"
				maxlength="15"
				bind:value={passwd}
			/>
			<button class="button" on:click={logIn}><span>Log In</span></button>
		{/if}
	</section>
</body>

<style>
	.logout {
		text-align: right;
		padding: 1em;
	}

	section {
		display: grid;
		justify-content: center;
		align-content: center;
	}

	h3 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		padding-top: 1em;
		font-weight: 100;
	}

	input[type="text"],
	input[type="password"] {
		width: 100%;
		padding: 1em 0.5em;
		box-sizing: border-box;
	}

	textarea {
		min-width: 20em;
		min-height: 5em;
		resize: none;
	}
</style>
