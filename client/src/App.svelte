<script>
	import Router from "svelte-spa-router";
	import Home from "../routes/home.svelte";
	import Privsek from "../routes/privsek.svelte";
</script>

<nav>
	<a href="/#/">Home</a>
	<a href="/#/privsek">Privsek</a>
</nav>
<Router routes={{
	"/": Home,
	"/privsek": Privsek,
}}/>

<style>
	nav {
		padding: 0.5em;
		text-align: left;
		position: absolute;
		z-index: 1;
	}

	a {
		color: #ff3e00;
		text-decoration: none;
	}
</style>
