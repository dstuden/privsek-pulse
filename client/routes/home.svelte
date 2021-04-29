<script>
	import "../src/global.css";
	// parts of site
	import Login from "../other/login.svelte"
	// firebase things
	import { auth } from "../../firebase.js";
	import { authState } from "rxfire/auth";
	// logout function
	import { logout } from '../../auth/logout.js';

	let user;

	const unsubscribe = authState(auth).subscribe((u) => (user = u));

	let amount = "",
		desc = "";

	function alertOrder() {
		if (amount == "") return alert("No amount specified!");
		if (amount < 1 || Number.isNaN(amount) == true || amount > 100)
			return alert("Amount not valid!");

		confirm(`Your final request is:\n` + amount + "\n" + desc);
	}

</script>

<body>
	{#if user}
		<div class="logout">
			<div class="dropdown">
				<img
					class="dropbtn"
					src={user.photoURL}
					width="50"
					alt="user avatar"
				/>
				<div class="dropdown-content">
					<button class="profile" on:click={logout}>Log Out</button>
				</div>
			</div>
		</div>
	{/if}
	<section>
		{#if user}
			<h3>Welcome<br />{user.displayName}</h3>
			<input
				type="number"
				min="1"
				class="ammount"
				placeholder="amount in €"
				bind:value={amount}
			/>
			<textarea
				class="note"
				maxlength="100"
				placeholder="Note for rivsek"
				bind:value={desc}
			/>
			<button class="request" on:click={alertOrder}
				><span>Request</span></button
			>
		{:else}
			<Login/>
		{/if}
	</section>
</body>

<style>
	img {
		border-radius: 1em;
		text-align: right;
	}

	.logout {
		text-align: right;
		padding: 1em;
	}
	
	.profile {
		background: #dbdbdb;
		border: #fa9f55 0.2em solid;
		padding: 0.1em;
	}

	.profile:active {
		background: #dbdbdb;
		border: #ff5e00 0.2em solid;
	}

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.request {
		padding: 0.5em;
		border: 0.15em #ff5e00 solid;
	}

	.request:active {
		border: 0.15em #fa9f55 solid;
		background: #ff5e00;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		min-width: 5em;
		z-index: 1;
	}

	.dropdown:hover .dropdown-content {
		display: block;
		right: 0;
	}
</style>
