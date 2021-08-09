import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './FirebaseConfig';

const FirebaseInstance = firebase.initializeApp(firebaseConfig.firebase);

export const Provider = {
  google: new firebase.auth.GoogleAuthProvider(),
};

export const Auth = firebase.auth();
export const FireStore = firebase.firestore();
export default FirebaseInstance;
