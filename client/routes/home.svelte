<script>
	import "../src/global.css";
	import { fade, fly } from "svelte/transition";
	import Icon from 'svelte-awesome';
    import {times} from 'svelte-awesome/icons';
	// parts of site
	import Login from "../other/login.svelte";
	// firebase things
	import { auth, db } from "../../firebase.js";
	import { authState } from "rxfire/auth";
	// logout function
	import { logout } from "../../auth/logout.js";
	import { database } from "svelte-awesome/icons";

	let mode = "normal",
		history = false,
		accepted = false,
		arr1 = [],
		arr2 = [];

	const width = screen.width;

	if (width <= 320) mode = "small";

	let user;

	const unsubscribe = authState(auth).subscribe((u) => (user = u));

	let amount = "",
		desc = "";

	function alertOrder() {
		if (amount == "") return alert("No amount specified!");
		if (amount < 1 || Number.isNaN(amount) == true || amount > 100)
			return alert("Amount not valid!");

		let send = confirm(`Your final request is:\n` + amount + "\n" + desc);

		if (send == true) {
			let date = new Date().toUTCString();
			db.collection("orders").add({
				name: user.displayName,
				id: user.uid,
				amount: amount,
				description: desc,
				date: date,
			});

			db.collection(user.uid).add({
				amount: amount,
				description: desc,
				date: date,
			});
		}
	}

	function removeOrder(itemID) {
        db.collection("approved").doc(itemID).delete();
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
					<button
						class="profile"
						on:click={() => {
							accepted = !accepted;
							history = false;
							db.collection("approved")
								.orderBy("amount", "desc")
								.onSnapshot((data) => {
									arr2 = data.docs;
								});
						}}>Approved</button
					>
					<button
						class="profile"
						on:click={() => {
							history = !history;
							accepted = false;
							db.collection(user.uid)
								.orderBy("date", "desc")
								.onSnapshot((data) => {
									arr1 = data.docs;
								});
						}}>History</button
					>
					<button class="profile" on:click={logout}>Log Out</button>
				</div>
			</div>
		</div>
	{/if}
	<section>
		{#if user}
			{#if history == true}
				<div
					class={mode === "normal" ? "history" : "historySmall"}
					transition:fly={{ x: 20, duration: 300 }}
				>
					{#each arr1 as object}
						<div class={mode === "normal" ? "items" : "itemsSmall"}>
							<p>{object.data().date}</p>
							<p>{object.data().amount + "€"}</p>
							<p>{object.data().description}</p>
						</div>
						<br />
					{/each}
				</div>
			{/if}
			{#if accepted == true}
				<div
					class={mode === "normal" ? "history" : "historySmall"}
					transition:fly={{ x: 20, duration: 300 }}
				>
					{#each arr2 as object}
						{#if object.data().id == user.uid}
							<div
								class={mode === "normal"
									? "items"
									: "itemsSmall"}
							>
								<p>{object.data().date}</p>
								<p>{object.data().amount}</p>
								<p>{object.data().description}</p>
								<button
								class="manageButton"
								on:click={removeOrder(object.id)}
								><Icon data={times} /></button
							>
							</div>
							<br />
						{/if}
					{/each}
				</div>
			{/if}
			<h3 class={mode === "small" ? "h3Small" : ""}>
				Welcome<br />{user.displayName}
			</h3>
			<div class="inputs">
				<input
					class={mode === "normal" ? "inputNormal" : "inputSmall"}
					type="number"
					min="1"
					placeholder="amount in €"
					bind:value={amount}
				/>
				<br />
				<textarea
					class={mode === "normal" ? "textNormal" : "textSmall"}
					maxlength="100"
					placeholder="Note for rivsek"
					bind:value={desc}
				/>
				<br />
				<button
					class={mode === "normal" ? "request" : "requestSmall"}
					on:click={alertOrder}><span>Request</span></button
				>
			</div>
		{:else}
			<Login />
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
		padding: 0.5em;
	}

	.profile {
		background: #dbdbdb;
		border-radius: 0.2em;
		border: #fa9f55 0.2em solid;
		padding: 0.1em;
		min-width: 5em;
	}

	.profile:active {
		border: #ff5e00 0.2em solid;
	}

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.request {
		padding: 0.5em;
		border: 0.2em #ff5e00 solid;
		width: 17em;
	}

	.requestSmall {
		padding: 0.5em;
		border: 0.2em #ff5e00 solid;
		width: 12em;
	}

	.request:active {
		border: 0.2em #fa9f55 solid;
		background: #ff5e00;
	}

	.requestSmall:active {
		border: 0.2em #fa9f55 solid;
		background: #ff5e00;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		max-height: 5em;
		z-index: 1;
		background-color: #dbdbdb;
	}

	.dropdown:hover .dropdown-content {
		display: block;
		right: 0;
	}

	.manageButton {
        border-radius: 50%;
        background: #fa9f55;
        width: 2em;
    }

	.history {
		position: absolute;
		right: 1em;
		overflow: auto;
		word-wrap: break-word;
		max-height: 50%;
		-ms-overflow-style: none;
  		scrollbar-width: none;
	}

	.historySmall {
		position: absolute;
		right: 0;
		overflow: auto;
		word-wrap: break-word;
		font-size: 0.8em;
		max-height: 80%;
		-ms-overflow-style: none;
  		scrollbar-width: none;
	}

	.history::-webkit-scrollbar {
    	display: none;
	}

	.historySmall::-webkit-scrollbar {
    	display: none;
	}

	.inputs {
		text-align: center;
	}

	.items {
		background: #dbdbdb;
		border: #ff3e00 0.2em solid;
		padding: 0em;
		text-align: center;
		max-width: 20em;
	}

	.itemsSmall {
		background: #dbdbdb;
		border: #ff3e00 0.2em solid;
		padding: 0.5em;
		text-align: center;
		max-width: 15em;
	}
</style>
