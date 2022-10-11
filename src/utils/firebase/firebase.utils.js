// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFqDS7xc6pcA8xQZvcyaW0OEfqiesNerc",
  authDomain: "clothing-db-2740b.firebaseapp.com",
  projectId: "clothing-db-2740b",
  storageBucket: "clothing-db-2740b.appspot.com",
  messagingSenderId: "437634175023",
  appId: "1:437634175023:web:afc5240388420ab66236da",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
// Receive auth from server
export const auth = getAuth();
//Exporting
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
