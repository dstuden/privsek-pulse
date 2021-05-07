<script>
	import "../src/global.css";
	import List from "../other/list.svelte";

	let loggedIn = false,
		usr,
		passwd;

	function logIn() {
		if (usr != __myapp.env.pUSER || passwd != __myapp.env.pPASSWD) {
			return alert("Wrong login info!\nnot privsek maybe????");
		} else {
			loggedIn = true;
		}
	}

	function logOut() {
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
			<h3 class="h3Small">Welcome<br />Privsek</h3>
			<List />
		{:else}
			<h3 class="h3Small">Welcome</h3>
			<div class="inputs">
				<input
					type="text"
					class="usr"
					placeholder="username"
					maxlength="15"
					bind:value={usr}
				/>
				<br />
				<input
					type="password"
					class="passwd"
					placeholder="password"
					maxlength="15"
					bind:value={passwd}
				/>
				<br />
				<button class="login" on:click={logIn}
					><span>Log In</span></button
				>
			</div>
		{/if}
	</section>
</body>

<style>
	.profile {
		text-align: right;
		padding: 0.5em;
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

	section {
		display: grid;
		justify-content: center;
		align-content: center;
	}

	.inputs {
		text-align: center;
	}

	.usr[type="text"] {
		padding: 1em 0.5em;
		box-sizing: border-box;
		width: 17em;
	}

	.passwd[type="password"] {
		width: 17em;
		padding: 1em 0.5em;
		box-sizing: border-box;
	}

	.login {
		background: #dbdbdb;
		border: #fa9f55 0.2em solid;
		padding: 0.5em;
		width: 17em;
	}

	.login:active {
		background: #dbdbdb;
		border: #ff5e00 0.2em solid;
	}

	@media only screen and (max-width: 600px) {
		.h3Small {
			padding-top: 1em;
		}

		.usr[type="text"] {
			padding: 1em 0.5em;
			box-sizing: border-box;
			width: 12em;
		}

		.passwd[type="password"] {
			width: 12em;
			padding: 1em 0.5em;
			box-sizing: border-box;
		}

		.login {
			background: #dbdbdb;
			border: #fa9f55 0.2em solid;
			padding: 0.5em;
			width: 12em;
		}

		.login:active {
			background: #dbdbdb;
			border: #ff5e00 0.2em solid;
		}
	}
</style>
