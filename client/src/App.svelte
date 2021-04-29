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
	"/privsek": Privsek
}}/>
<footer>
	<p>
		<a href="https://github.com/dstuden/privsek-service">Privsek Pulse</a> | PogWorks Studios © 2021
	</p>
</footer>

<style>
	nav {
		padding: 0.5em;
		text-align: left;
		position: fixed;
		z-index: 1;
	}

	a {
		color: #ff3e00;
		text-decoration: none;
	}

	footer {
		position: fixed;
		z-index: 1;
		background: #d6d6d6;
		padding: 0.6em 0 0.6em 0;
		width: 100%;
		bottom: 0;
	}
</style>
