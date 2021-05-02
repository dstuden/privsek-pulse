<script>
	import "../src/global.css";
	import List from "../other/list.svelte";

	let mode = "normal";

	const width = screen.width;

	if (width <= 320) mode = "small";

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
			<h3 class="{mode === 'small' ? 'h3Small' : ''}">Welcome<br />Privsek</h3>
			<List />
		{:else}
				<h3 class="{mode === 'small' ? 'h3Small' : ''}" >Welcome</h3>
				<div class="inputs">
				<input
					type="text"
					class="{mode === 'normal' ? 'usr' : 'usrSmall'}"
					placeholder="username"
					maxlength="15"
					bind:value={usr}
				/>
				<br>
				<input
					type="password"
					class="{mode === 'normal' ? 'passwd' : 'passwdSmall'}"
					placeholder="password"
					maxlength="15"
					bind:value={passwd}
				/>
				<br>
				<button class="{mode === 'normal' ? 'login' : 'loginSmall'}" on:click={logIn}
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

	.loginSmall {
		background: #dbdbdb;
		border: #fa9f55 0.2em solid;
		padding: 0.5em;
		width: 12em;
	}
	
	.loginSmall:active {
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

	.usrSmall[type="text"] {
		padding: 1em 0.5em;
		box-sizing: border-box;
		width: 12em;
	}

	.passwdSmall[type="password"] {
		width: 12em;
		padding: 1em 0.5em;
		box-sizing: border-box;
	}

	.h3Small {
		padding-top: 1em;
	}
</style>
