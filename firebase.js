import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

try {
  var firebaseConfig = {
    apiKey: __myapp.env.apiKey,
    authDomain: __myapp.env.authDomain,
    projectId: __myapp.env.projectId,
    storageBucket: __myapp.env.storageBucket,
    messagingSenderId: __myapp.env.messagingSenderId,
    appId: __myapp.env.appId,
    measurementId: __myapp.env.measurementId
  };
}
catch (err) {
  console.log(err);
}
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const GithubAuthProvider = new firebase.auth.GithubAuthProvider();

export const db = firebase.firestore();