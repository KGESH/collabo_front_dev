import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './FirebaseConfig';

const FirebaseInstance = firebase.initializeApp(firebaseConfig.firebase);

export default FirebaseInstance;
