/* Firebase 8 config kısmı npm kısmını kullanmadık */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBqdbWH6Li8EI5hooslafK9yKMySinPpOM",
  authDomain: "benjamintecnogenc.firebaseapp.com",
  projectId: "benjamintecnogenc",
  storageBucket: "benjamintecnogenc.appspot.com",
  messagingSenderId: "500507790611",
  appId: "1:500507790611:web:67a5620f71bab7e4a65ee6"
};
/* init ettik */
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const projectAuth = firebase.auth();
export { projectFirestore, timestamp, projectAuth };