<script>
	import "../src/global.css";
	import List from '../other/list.svelte'

	let loggedIn = false,
		usr,
		passwd;

	if (localStorage.getItem("validated")) {
		loggedIn = true;
	}

	function logIn() {
		if (usr != __myapp.env.pUSER || passwd != __myapp.env.pPASSWD) {
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
		<div class="profile">
			<button class="logout" on:click={logOut}>Log Out</button>
		</div>
	{/if}
	<section>
		{#if loggedIn == true}
			<h3>Welcome<br />Privsek</h3>
			<List/>
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
			<button class="login" on:click={logIn}><span>Log In</span></button>
		{/if}
	</section>
</body>

<style>
	.profile {
		text-align: right;
		padding: 1em;
	}

	.logout {
		background: #dbdbdb;
		border: #fa9f55 0.2em solid;
		padding: 0.1em;
	}

	.logout:active {
		background: #dbdbdb;
		border: #ff5e00 0.2em solid;
	}

	.login {
		background: #dbdbdb;
		border: #fa9f55 0.2em solid;
		padding: 0.5em;
	}
	.login:active {
		background: #dbdbdb;
		border: #ff5e00 0.2em solid;
	}

	section {
		display: grid;
		justify-content: center;
		align-content: center;
	}

	input[type="text"],
	input[type="password"] {
		width: 100%;
		padding: 1em 0.5em;
		box-sizing: border-box;
	}
</style>
