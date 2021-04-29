import {auth} from "../../firebase.js";

export function logout() {
    auth.signOut();
}