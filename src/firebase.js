import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8Ei4Cniw9z4nWcCpEGm1_m2GbtpsMw7o",
  authDomain: "linkedin-clone-ae3dd.firebaseapp.com",
  projectId: "linkedin-clone-ae3dd",
  storageBucket: "linkedin-clone-ae3dd.appspot.com",
  messagingSenderId: "377830998699",
  appId: "1:377830998699:web:63b6ad42d47b311d5badee",
  measurementId: "G-85XQHMHWCD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
