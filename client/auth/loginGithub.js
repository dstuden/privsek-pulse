import {auth, googleProvider, GithubAuthProvider} from "../../firebase.js";

export function loginGithub() {
    auth.signInWithPopup(GithubAuthProvider).catch(
        function (error) {
            // checks for the another account error
            console.log(error)
            if (error.code === "auth/account-exists-with-different-credential") {
                alert("You already have an account registered!\nLogging you in...");
                auth.signInWithRedirect(googleProvider);
            }
        }
    );
}