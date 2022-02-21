import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBFwgyIRutj213yMLi59x_KN9hNFxFEs2I",
    authDomain: "linkedin-clone-c3d3d.firebaseapp.com",
    projectId: "linkedin-clone-c3d3d",
    storageBucket: "linkedin-clone-c3d3d.appspot.com",
    messagingSenderId: "912467447343",
    appId: "1:912467447343:web:f74e85b6085dab9a9440da",
    measurementId: "G-2JJ1P68XX1"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth ,provider, storage };
export default db;