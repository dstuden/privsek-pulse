<script>
    import {loginGithub} from '../auth/loginGithub.js';
	import {loginGoogle} from '../auth/loginGoogle.js';
</script>

<h1 style="font-style: italic;">PP</h1>
<button class="loginButton" on:click={loginGithub}
    ><img
        src="https://image.flaticon.com/icons/svg/25/25231.svg"
        alt="google-logo"
        width="30"
    />Login with GitHub</button
>
<button class="loginButton" on:click={loginGoogle}
    ><img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="google-logo"
        width="30"
    />Login with Google</button
>

<style>
    .loginButton {
		background: #dbdbdb;
		border: #fa9f55 0.2em solid;
		display: flex;
    	align-items: center;
	}

	.loginButton:active {
		background: #dbdbdb;
		border: #ff5e00 0.2em solid;
	}
</style>
