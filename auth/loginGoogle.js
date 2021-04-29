import {auth, googleProvider} from "../firebase.js";

export function loginGoogle() {
    auth.signInWithPopup(googleProvider);
}