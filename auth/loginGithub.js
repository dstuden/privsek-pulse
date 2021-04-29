import {auth, googleProvider, GithubAuthProvider} from "../firebase.js"

export function loginGithub() {
    auth.signInWithPopup(GithubAuthProvider).catch(
        function (error) {
            // checks for the another account error
            console.log(error);
            if (error.code === "auth/account-exists-with-different-credential") {
                auth.signInWithRedirect(googleProvider);
                console.log('Your email address was already registered!');
            }
        }
    );
}